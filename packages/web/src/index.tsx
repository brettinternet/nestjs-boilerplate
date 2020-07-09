import React from 'react'
import ReactDOM from 'react-dom'

import { App } from 'components/app'
import * as serviceWorker from 'utils/service-worker'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorker.unregister()
