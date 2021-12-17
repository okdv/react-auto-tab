# react-auto-tab

react-auto-tab is a react.js package that brings several tabbing features with little change to your code.

## Demo 
[See the demo/example here!](https://okdv.github.io/react-auto-tab/)
## Installation

Use the package manager [npm](https://www.npmjs.com) to install react-auto-tab.

```bash
npm install react-auto-tab
```
## Custom props and settings
> **propName** - *type* - `defaultValue` : description

**tabbable** : A child of a provider will be included in the tab group if it has this prop. To ignore, simply omit. To suppress some React warnings, `tabbable="true"` is recommended.

**settings** - *object* : Nearly all props live within `settings`, should be a Javascript object. Global overrides go on the provider, local overrides go on any children. Default `settings` are outlined by the defaults below. 

___
All props below are available as items in the `settings` prop object
___

**tabOnMax** - *boolean* - `true` : tab when maxLength is met, maxLength must be defined as an integer `maxLength={1}`. 

**tabOnKeys** - *array* - `["enter"]` : tab when any key in the array is pressed.

**backTabOnKeys** - *array* - `["backspace"]` : 'backtab' to the previous element when any key in array is pressed, current element value must be blank.

**tabOnChange** - *boolean* - `false` : tab when onchange of current element.

**placement** - *integer* - `placement index in children` : local only, can be used to manually set tabbing order of tabbable elements in the tab group. When used on one child, must be used on all children in that tab group. 

**pasteToFit** - *boolean* - `true` : when pasted value is longer than `maxLength` of an element, this will paste the remainder into the next element- until pasted in full, or the end of the tab group.

## Usage

```javascript
import {AutoTabProvider} from 'react-auto-tab'

const VerificationCode = () => {
   return (
      <AutoTabProvider>
          <input type="text" maxLength={3} tabbable />
          <span>-</span>
          <input type="text" maxLength={3} tabbable />
      </AutoTabProvider>
   )
}
```
Import and use the `AutoTabProvider` element as the parent for each tab group. Multiple providers can be present. 

Use the `tabbable` prop on any children that should be included in the tab group, they do not have to be direct children. To ignore children, simply omit this prop. 

```javascript
return (
   <AutoTabProvider settings={{tabOnMax:false,backTabOnKeys:[],tabOnKeys:['enter','spacebar']}}>
      <input type="text" maxLength={3} tabbable /> {/* no tabOnMax due to global settings */}
      <input type="text" maxlength="3" tabbable settings={{tabOnMax:true}} /> {/* no tabOnMax due to maxlength !== maxLength and should be an integer */}
      <input type="text" maxLength={3} settings={{tabOnMax:true,tabOnKeys:[]}} /> {/* tabOnMax works, tabOnKeys doesnt */}
   </AutoTabProvider>
)
```
Attach a setting onto the `settings` prop on either the provider or its children. On the provider, it will act as global settings. On a child, it will be a local override to the global settings, for that element only.

```xml
   <AutoTabProvider className="tab-group" id="group-1">
      <input style={{color:"red"}} type="text" maxLength={3} onChange={handleChange} tabbable />
      <input type="text" maxLength={3} onKeyDown={() => console.log("hello world")}} tabbable />
      <input type="text" maxLength={3} onPaste={e => handlePaste(e)} tabbable />
   </AutoTabProvider>
```
Use any of your own props, functions, children, etc. So long it does not use `settings` or `tabbable` as its name. Props on the AutoTabProvider will carry to the `div` it creates.

The following props have restrictions: `maxLength` must be camelCase and an integer (`maxLength={3}`), `style` must be a JS object

The follow functions have restrictions: `onChange`, `onKeyDown`, and `onPaste` must be camelCase and cannot be written as an inline string function.

```xml
<div>
   <AutoTabProvider>
      <div>
         <input type="text" tabbable /> 
      </div>
      <input type="text" tabbable />
   </AutoTabProvider>
   <AutoTabProvider>
      <input type="radio" tabbable />
      <select tabbable>
         <option>one</option>
         <option>one</option>
      </select>
      <textarea tabbable>
      <input type="checkbox" tabbable />
   </AutoTabProvider>
</div>
``` 
Use multiple providers, put tabbable children several elements deep, use any element that can handle focus and an `onChange` event. The package is very flexible to fit most use-cases. 

```javascript
const myRef = React.createRef()

const CustomInput = React.forwardRef((props,ref) => (
   <input ref={ref} onChange={props.onChange} onKeyDown={props.onKeyDown} onPaste={props.onPaste} />
))

const App = () => {
   return (
      <AutoTabProvider>
         <input type="text maxLength={2} tabbable />
         <CustomInput ref={myRef} tabbable />
         <input type="text maxLength={2} tabbable />
      </AutoTabProvider>
)}
```
Use with custom elements, so long that element can do a few things: 

 - Forward a custom `ref` to an element it renders
 - Handle `onChange`, `onKeyDown`, and `onPaste` on the same element receiving the 
forwarded `ref`

This also provides some insight into how you can insert custom refs for elements. Otherwise, the package will create its own `ref` for each tabbable element. [See the React refs documentation for more info](https://reactjs.org/docs/refs-and-the-dom.html).

## Known issues, limitations and notes
 - To suppress React warning: "Received `true` got a non-boolean attribute `tabbable`", add a string of "true" to the prop, example: `tabbable="true"`
 - Props utilized by the package must be in camelCase and have an inline JS value, examples: `onChange={handleChange}`, `style={{width:"1px"}}`, `maxLength={2}`, etc
 - Providers cannot be placed within one another
 - Has not been tested with callback refs or > React v16.3
 - Known working elements:`input`, `textarea`, and `select`
 - Known working input types: checkbox (`onChange` only), color (`onChange` only), date (`onChange` only), datetime-local (`onChange` only), email, file (`onChange` only), image (`onChange` only), month (`onChange` only), number, password, radio (`onChange` only), range (`onChange` only), search, tel, text, time (`onChange` only), url, week (`onChange` only)

## Migrating from 1.X.X
The migration is simple. The same `AutoTabProvider` is used, options/settings available are still stored within the `settings` prop of the provider.

Package options on children are now located inside a `settings` prop as well. So `<input type="text" maxLength="3" focusonmax="true" />` will now become `<input type="text" maxLength={3} settings={{tabOnMax:true}} tabbable />`. 

Certain props like `maxLength` and `style` cannot equal a string, see docs. Must be camelCase.  

Certain props like `ignorefocus` have been deprecated. Instead use `tabbable` when a child should be tabbable, and omit this when it should be ignored. 

While many prop names changed, they carry the same functions mostly. The change mappings are below:
 - `prevonkey` => `backTabOnKeys`
 - `nextonkey` => `tabOnKeys`
 - `nextonmax` => `tabOnMax`

There are some new props and instructions for custom props and functions. Review docs for this information.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)