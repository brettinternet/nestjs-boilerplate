import React, { useState } from 'react'

import { fetch } from 'utils/fetch'

export const App = () => {
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('rb@cAe9L7AHXGA734QpCBSpX2!s@qV')

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    console.log('email: ', email, password)
    const response = await fetch('POST', '/api/auth/login', {
      email,
      password,
    })
    if (response.ok) {
      const body = await response.json()
      console.log('body: ', body)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">email</label>
      </div>
      <div>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={ev => {
            setEmail(ev.currentTarget.value)
          }}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
      </div>
      <div>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={ev => {
            setPassword(ev.currentTarget.value)
          }}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
