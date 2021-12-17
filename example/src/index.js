import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import App from './App'

ReactDOM.render(
    <ChakraProvider>
        <ColorModeScript initialColorMode='dark' />
        <App />
    </ChakraProvider>, 
    document.getElementById('root')
)
