import React from 'react'
import ReactDOM from 'react-dom'

import { App } from 'components/app'
import * as serviceWorker from 'utils/service-worker'

import { CreateUserDto } from '@packages/common/dto/create-user.dto'
console.log('CreateUserDto: ', CreateUserDto)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorker.unregister()
