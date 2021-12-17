import React from 'react'
import { AutoTabProvider } from 'react-auto-tab'
import {
  Container,
  Heading,
  Text,
  Code,
  Tag,
  Badge,
  SimpleGrid,
} from '@chakra-ui/react'

const Feature = ({title,type,tagColor,val,valColor,desc,required}) => (
  <Text>
    <Code mr="5px">{title}</Code>
    <Tag mx="5px" colorScheme={tagColor}>{type}</Tag>
    <Code mr="5px" textColor={valColor}>{val}</Code>
    {required ? <Badge colorScheme="red">required</Badge> : ""}
    <span>:&nbsp;{desc}</span>
  </Text>
)

const App = () => {
  return (
    <Container>
      <Container my="3" textAlign='center'>
        <Heading size="2xl">react-auto-tab</Heading>
        <Text fontSize="xl">Simple auto tabbing provider for React.js</Text>
      </Container>
      <br />
      <Container>
        <Feature title="tabOnMax" type="boolean" tagColor="teal" val="true" valColor="blue" desc="tabs to next input when maxLength is met, maxLength must be greater than zero to work on any element" />
        <AutoTabProvider className="tab-group big-input-group">
          <Text m="1">+</Text>
          <input  style={{width:".8em"}} placeholder='1' type="text" maxLength={1} tabbable="true" />
          <Text m="1">+</Text>
          <input style={{width:"2em"}} placeholder='888' type="text" maxLength={3} tabbable="true" />
          <Text m="1">)&nbsp;</Text>
          <input style={{width:"2em"}} placeholder='867' type="text" maxLength={3} tabbable="true" />
          <Text m="1">-</Text>
          <input style={{width:"2.5em"}} placeholder='5309' type="text" maxLength={4} tabbable="true" />
        </AutoTabProvider>
      </Container>
      <br />
      <Container>
        <Feature title="tabOnKeys" type="array" tagColor="blue" valColor="black" val="['enter']" desc="tabs to next input when a key in the array is pressed, while the input is focused" />
        <AutoTabProvider className="tab-group hidden-input-group" style={{backgroundColor:"#fff"}}>
          <Text m="1">First:</Text>
          <input style={{width:"5em"}} type="text" tabbable="true" />
          <Text m="1">Middle Initial:</Text>
          <input style={{width:".8em"}} type="text" maxLength={1} tabbable="true" />
          <Text m="1">Last:</Text>
          <input style={{width:"7em"}} type="text" tabbable="true" />
        </AutoTabProvider>
      </Container>
      <br />
      <Container>
        <Feature title="backTabOnKeys" type="array" tagColor="blue" val="['backspace']" valColor="black" desc="'backtabs' when a key in the array is pressed, while the input is focused and has no value " />
        <AutoTabProvider className="tab-group hidden-input-group" style={{backgroundColor:"#fff"}}>
          <Text m="1">Street:</Text>
          <input style={{width:"7em"}} type="text" defaultValue="123 Main St" tabbable="true" />
          <Text m="1">Unit:</Text>
          <input style={{width:".8em"}} type="text" maxLength={1} tabbable="true" />
          <Text m="1">City:</Text>
          <input style={{width:"7em"}} type="text" defaultValue="Ne" tabbable="true" />
          <Text m="1">State:</Text>
          <input style={{width:"7em"}} type="text" tabbable="true" />
        </AutoTabProvider>
      </Container>
      <br />
      <Container>
        <Feature title="placement" type="integer" tagColor="yellow" desc="index position in tab order, order of rendering by default" />
        <AutoTabProvider className="tab-group big-input-group placement-example">
          <input placeholder='First' type="text" settings={{placement:1}} maxLength={5} tabbable="true" />
          <input placeholder='Third' type="text" settings={{placement:3}} maxLength={5} tabbable="true" />
          <input placeholder='Second' type="text" settings={{placement:2}} maxLength={5} tabbable="true" />
        </AutoTabProvider>
      </Container>
      <br />
      <Container>
        <Feature title="tabOnChange" type="boolean" tagColor="teal" val="false" valColor="blue" desc="tabs onChange of focused element" />
        <AutoTabProvider className="tab-group big-input-group group-spacing">
          <input style={{width:"7em"}} placeholder='Look' type="text" maxLength={5} tabbable="true" />
          <select settings={{tabOnChange:true}} tabbable="true">
            <option>Select one</option>
            <option>Hello</option>
            <option>There</option>
          </select>
          <input style={{width:"7em"}} placeholder='How' type="text" maxLength={5} tabbable="true" />
          <input settings={{tabOnChange:true}} type="checkbox" id="check-1" tabbable="true" />
          <input style={{width:"7em"}} placeholder='Versatile' type="text" maxLength={5} tabbable="true" />
          <input settings={{tabOnChange:true}} type="radio" name="radio-group" tabbable="true" />
          <input style={{width:"3em"}} placeholder='Wow' type="text" maxLength={5} tabbable="true" />
        </AutoTabProvider>
      </Container>
      <br />
      <Container>
        <Feature title="pasteToFit" type="boolean" tagColor="teal" val="true" valColor="blue" desc="pasted values will extend into the next tabbable elements, using maxLength as its method of limitation" />
        <AutoTabProvider className="tab-group big-input-group paste-example">
          <input type="text" maxLength={1} tabbable="true" />
          <input type="text" maxLength={1} tabbable="true" />
          <input type="text" maxLength={1} tabbable="true" />
          <Text m="1">-</Text>
          <input type="text" maxLength={1} tabbable="true" />
          <input type="text" maxLength={1} tabbable="true" />
          <input type="text" maxLength={1} tabbable="true" />        
        </AutoTabProvider>
        <Text fontSize="sm">Try pasting "123456"</Text>
      </Container>
      <br />
      <SimpleGrid textAlign="center" columns={2}>
        <Text>Made with&nbsp;&#9829;&nbsp;&amp;&nbsp;&#9834;</Text>
        <Text>{new Date().getFullYear() || "2021"}&nbsp;&copy;&nbsp;Otho DuBoise</Text>
      </SimpleGrid>
    </Container>
  )
} 

export default App
