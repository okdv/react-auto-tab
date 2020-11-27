# react-auto-tab

This is a lightweight package that allows you to easily implement auto-tabbing (focusing the next input), even in your existing project. You can auto-tab forward on maxLength, keypress, or both! You can even reverse-tab on backspacing an empty input!

## Demo / Example

[Go to this page to see a live demo!] (https://okdv.github.io/react-auto-tab/)

## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install react-auto-tab.

```bash
npm install --save react-auto-tab
```

## Basic Usage

To start, all you have to do is wrap your code in the `<AutoTabProvider>` element. Wrap each group that you would like have auto-tabbing in. All `input`, `textarea` and `select` elements are included as focusable, by default

```jsx
import React from 'react'
import { AutoTabProvider } from 'react-auto-tab'

const App = () => {
  return (
    <AutoTabProvider>
      <label>Birthday: </label>
      <input type='text' maxLength='2' placeholder='MM' />
      <span>/</span>
      <input type='text' maxLength='2' placeholder='DD' />
      <span>/</span>
      <input type='text' maxLength='4' placeholder='YYYY' />
    </AutoTabProvider>
  )
}
```

## Props

There are a few props available. Only one prop is currently unique to the children elements, none are unique to `AutoTabProvider`.

To pass props to the wrapping `<div>`, which replaces `<AutoTabProvider>` in the DOM, include each props as an object property. Pass this object to the element with the settings prop.

```javascript
const settings = {
  className: 'myClass',
  id: 'myId',
  focusonkey: 'enter'
  //...
}
return <AutoTabProvider settings={settings}>...</AutoTabProvider>
```

To pass props to a child of `<AutoTabProvider>`, just include it as a prop on the element

```html
<AutoTabProvider>
  <label for="myInput-1" className="myClass" myId="myId" style="">You</label>
  <input type="text" ignorefocus="{1}" className="myClass" maxlength="2" />
  <span className="mySpan">Are</span>
  <input
    type="number"
    customProp="customValue"
    focusonmax="false"
    focusonkey="enter"
  />
  <p>Awesome</p>
  <input type="text" maxlength="3" />
</AutoTabProvider>
```

These are all of the properties that can be use in `AutoTabProvider.props.settings` as well as props on children elements. The parent settings will set the behavior for all elements, unless the same prop is present on a child.

- `prevonkey`: _integer_ Toggle back-tab/focus previous on backspacing an empty input, `{1}` or 'true' by default.
- `nextonkey`: _string_ Auto-tab/focus next element on press of this key, for example 'enter'. `null`, or off, by default.
- `nextonmax`: _integer_ Toggle auto-tab/focus next element on hitting an elements maxLength. If there is no maxLength on that element, it will be `0` or 'false'. `1`, or true by default.

There is currently only one prop unique to children, and no props unique to the parent settings. The below prop is unique to focusable children elements.

- `ignorefocus`: _integer_ If set to `1`, element will be ignored and 'jumped' in the focus sequence. `0`, or false, by default

As a note, `nextonmax` and `nextonkey` can be active at the same time and running whichever is triggered first. If you have `maxLength` set and do not want to auto-tab on max length, `nextonmax` must be disabled.

## Styling and Other Info

Styling, and using your own props on both `AutoTabProvider` and its children, is super easy. Just include whatever props, like `className`, `id`, `style` or `customProp`, using the same technique as the packages props, listed above.

As mentioned, any `input`, `textarea`, and `select` elements are included as focusable, by default. You can use the provided `ignore` prop on children to skip any of the elements mentioned.

Non-direct children will not be focusable, but they will still be rendered. For example, the input in the below example with `id: 'nonDirect'` will be skipped without use of `ignore`, but it will still render

```html
<AutoTabProvider>
  <input type="text" maxlength="2" />
  <div>
    <input type="text" maxlength="3" id="nonDirect" />
  </div>
  <input type="text" maxlength="2" />
</AutoTabProvider>
```

It is also totally fine to use several `AutoTabProvider` elements back to back!

Technically, this should work with any `input` types. That being said, it has only been tested using `password`, `text`, and `number`. When possible, it is recommended to use type `text`. Please report any found issues with other types using the issues info below.

## Examples

Just to make sure _all bases_ are covered here, here are several examples of usage. To see some live examples, you will need to download and run the example from [here](https://github.com/okdv/react-auto-tab).

First we will just turn off `prevonkey`, so when we backspace on an empty element here, it wont back-tab to the previous element.

```html
<AutoTabProvider settings="{{prevonkey:" false}}>
  <input type="text" maxlength="3" />
  <span>-</span>
  <input type="text" maxlength="2" />
  <span>-</span>
  <input type="text" maxlength="4" />
</AutoTabProvider>
```

Next we will turn on `nextonkey` and set it to 'Enter', expect for the middle input, it will focus on maxLength this. This can be accomplished by simply not setting a maxLength for the other inputs, or you can disable maxLength in the `AutoTabProvider` settings, and only enable it for the middle input. Lets see both

```html
<AutoTabProvider settings={{nextonkey: 'enter'}}>
   <label>Name</label>
   <input type="text" placeholder="First" />
   <input type="text" maxLength="1" placeholder="M" />
   <span>.  </span>
   <input type="text" placeholder="Last" />
</AutoTabProvider>

<AutoTabProvider settings={{nextonkey: 'enter', nextonmax: 0}}>
   <label>Name</label>
   <input type="text" maxLength="30" placeholder="First" />
   <input type="text" nextonmax={1} maxLength="1" placeholder="M" />
   <span>.  </span>
   <input maxLength="30" type="text" placeholder="Last" />
</AutoTabProvider>
```

What if you just wanted to ignore the middle name in the above example?

```html
<AutoTabProvider settings={{nextonkey: 'enter'}}>
   <label>Name</label>
   <input type="text" placeholder="First" />
   <input type="text" ignorefocus={1} maxLength="1" placeholder="M" />
   <span>.  </span>
   <input type="text" placeholder="Last" />
</AutoTabProvider>
```

Anything that you think should be added to the documentation? See how to get in touch in the issues section below

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Issues

If you have any feedback, notice any bugs, or just have a burning question feel free to [open an issue on Github](https://github.com/okdv/react-auto-tab/issues).

## License

[MIT](https://github.com/okdv/react-auto-tab/blob/master/LICENSE.txt) © [Otho DuBois](https://github.com/okdv)
