import {React, ReactDOM, StrictMode} from 'react' 
import ReactDom from 'react-dom'
import {createRoot} from 'react-dom/client'
import App from './App'
import Square from './components/Board'

let container = document.getElementById('root')

let root = createRoot(container)

root.render(
    <StrictMode>
        <App/>
    </StrictMode>
)