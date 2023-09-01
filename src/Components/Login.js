import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'

export default function Login(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [insertDataError, setInsertDataError] = useState({
    eEmail: '',
    ePassword: '',
  })

  let emailValid = false
  let passwordValid = false


  function validateLogIn() {
    if (email.includes('@')) {
      setInsertDataError((prevState) => {
        return {
          ...prevState,
          eEmail: '',
        }
        emailValid = true
      })
    } else {
      setInsertDataError((prevState) => {
        return {
          ...prevState,
          eEmail: '!The email you entered is not connected to an account. Please try again!',
        }
        emailValid = false
      })
    }
    if (password.length >= 7) {
      setInsertDataError((prevState) => {
        return {
          ...prevState,
          ePassword: '',
        }
        passwordValid = true
      })
    } else {
      setInsertDataError((prevState) => {
        return {
          ...prevState,
          ePassword: '!Incorrect password!',
        }
        passwordValid = false
      })
    }
  }

  function logInHandler(e) {
    e.preventDefault()
    validateLogIn()
    if (emailValid || passwordValid) {
      return props.handlerShowLogIn()
    }
  }



  return (
    <form onSubmit={(e) => logInHandler(e)}>
      <div>
        <div className="row justify-content-center">
          <div className="col-md-5 shadow-lg p-3 mb-5 bg-white rounded">
            <h1>Log In</h1>

            <input type='text' placeholder='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
            <p>{insertDataError.eEmail}</p>

            <input type="password" placeholder='password' className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            <p>{insertDataError.ePassword}</p>

            <h1><button type='submit' className='btn btn-success' >Log In</button></h1>
          </div>
        </div>
      </div>
    </form>
  )
}