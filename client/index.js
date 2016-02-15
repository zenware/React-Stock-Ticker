import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'

ReactDOM.render(
    <App pollInterval={6000}/>,
    document.getElementById('root')
)
