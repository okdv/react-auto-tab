import React from 'react'

export const AutoTabProvider = (props) => {
  let tabGroup = [] 

  const tabRef = React.useRef([])
  
  const focusOn = (i) => tabRef.current[i] ? tabRef.current[i].focus() : ""

  const addProps = (el) => {
    const settings = {
      placement: tabGroup.length, 
      tabOnChange:false,
      tabOnMax:true,
      tabOnKeys:["enter"],
      backTabOnKeys:["backspace"],      
      pasteToFit: true,
      maxLength: el.props.maxLength || undefined,
      ...props.settings,
      ...el.props.settings
    }
    return {
      ref: (ref) => (tabRef.current[settings.placement] = ref),
      onPaste: (e) => {
        typeof el.props.onPaste === 'function' ? el.props.onPaste(e) : ""
        if (settings.pasteToFit === true) {
          let clipboardData = e.clipboardData || window.clipboardData, pasteVal = clipboardData.getData('Text'), i = settings.placement
          e.preventDefault()
          while (tabRef.current[i] && pasteVal.length > 0) {
            let tabMax = tabGroup[i].props.maxLength || pasteVal.toString().length
            tabRef.current[i].value = pasteVal.slice(0,tabMax)
            pasteVal = pasteVal.slice(tabMax)
            focusOn(i)
            i++
          }
        }
      },
      onKeyDown: (e) => {
        typeof el.props.onKeyDown === 'function' ? el.props.onKeyDown(e) : ""
        settings.tabOnKeys.forEach(key => key === e.key.toLowerCase() ? (focusOn(settings.placement+1),e.preventDefault()) : "")
        settings.backTabOnKeys.forEach(key => key === e.key.toLowerCase() ? 
          (e.target.value.length === 0 ? 
            (focusOn(settings.placement-1),e.preventDefault()) : "") : "")
      },
      onChange: (e) => {
        typeof el.props.onChange === 'function' ? el.props.onChange(e) : ""
        settings.tabOnMax === true && (settings.maxLength === e.target.value.length) ? focusOn(settings.placement+1) : ""
        settings.tabOnChange === true ? focusOn(settings.placement+1) : ""
      }
    }
  }

  const processElements = (elements) => {
    let processed = []
    elements = Array.isArray(elements) ? elements : [elements]
    elements.forEach((el) => {
      if (el.tabbable || (el.props && el.props.tabbable)) {
        processed.push(React.cloneElement(el,{key:processed.length, ...addProps(el)},el.props.children))
        tabGroup.push(el)
      } else if (el.props && el.props.children && (Array.isArray(el.props.children) || typeof el.props.children === 'object')) {
        processed.push(React.cloneElement(el,{key:processed.length},processElements(el.props.children)))
      } else processed.push(React.cloneElement(el,{key:processed.length}, el.props ? (el.props.children || "") : ""))
    })
    return processed
  }
  
  return (
    <div className={props.className || undefined} id={props.id || undefined} style={props.style || undefined}>
      {processElements(props.children).map(clone => clone)}
    </div>
  )
}
