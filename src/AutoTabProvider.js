import React, { useRef } from 'react'

const AutoTabProvider = (props) => {
  // Get children and settings
  const children = props.children || []
  children.length > 0
    ? ''
    : console.log('react-auto-tab: children props required')
  const settings = props.settings || {}
  // Get settings, set defaults accordingly
  const prevOnKey =
    settings.prevonkey != undefined && settings.prevonkey === 0 ? false : true
  const nextOnKey =
    settings.nextonkey && settings.nextonkey !== null
      ? settings.nextonkey
      : false
  const nextOnMax =
    settings.nextonmax != undefined && settings.nextonmax === 0 ? false : true
  // Other vars
  let focusable = []
  let clones = []
  // Create useRef
  const inputRef = useRef([])
  // Helper functions
  const focusOn = (i) => {
    const me = inputRef.current[i]
    if (me) {
      me.focus()
    }
  }
  const prevOnKeyF = (i) => (e) => {
    if (e.target.value.length < 1 && e.key.toLowerCase() == 'backspace') {
      focusOn(i - 1)
    }
  }
  const nextOnKeyF = (i) => (e) => {
    if (e.key.toLowerCase() == settings.nextonkey.toLowerCase()) {
      focusOn(i + 1)
    }
  }
  const nextOnMaxF = (i) => (e) => {
    if (
      e.target.maxLength &&
      e.target.maxLength > 0 &&
      e.target.value.length >= e.target.maxLength
    ) {
      focusOn(i + 1)
    }
  }
  // Loop through children
  children.forEach((child, i) => {
    const type = child.type.toLowerCase()
    // Check if its focusable
    if (
      (type == 'select' || type == 'textarea' || type == 'input') &&
      (!child.props.ignorefocus || child.props.ignorefocus === 0)
    ) {
      const placement = focusable.length
      const maxLength = child.props.maxLength ? child.props.maxLength : false
      const _prevOnKey =
        child.props.prevonkey != undefined
          ? child.props.prevonkey === 0
            ? false
            : true
          : prevOnKey
      const _nextOnKey =
        child.props.nextonkey != undefined ? child.props.nextonkey : nextOnKey
      const _nextOnMax =
        child.props.nextonmax != undefined
          ? child.props.nextonmax === 0
            ? false
            : true
          : nextOnMax

      // Clone focusable object
      let clone = React.cloneElement(child, {
        placement: placement,
        key: i,
        ref: (el) => (inputRef.current[placement] = el),
        onChange:
          _nextOnMax === false || maxLength === false
            ? undefined
            : nextOnMaxF(placement),
        onKeyUp: _prevOnKey === false ? undefined : prevOnKeyF(placement),
        onKeyDown: _nextOnKey === false ? undefined : nextOnKeyF(placement)
      })
      focusable.push(clone)
      clones.push(clone)
      return
    } else {
      // Clone not focusable child
      let clone = React.cloneElement(child, {
        key: i
      })
      clones.push(clone)
    }
  })
  return (
    <div
      className={settings.className || undefined}
      id={settings.id || undefined}
    >
      {clones.map((el) => {
        return el
      })}
    </div>
  )
}

export default AutoTabProvider
