import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'

ReactDOM.render(
    <App pollInterval={7500}/>,
    document.getElementById('root')
)
