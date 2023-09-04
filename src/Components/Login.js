import React, { useEffect, useState, useContext } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import userEvent from '@testing-library/user-event'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth, app } from '../utils.js'
import { Button, Modal, Form } from 'react-bootstrap';
import AuthContext from '../store/auth-context.js';

export default function Login(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [insertDataError, setInsertDataError] = useState({
    eEmail: '',
    ePassword: '',
  })
  const [mainTransfer, setMainTransfer] = useState(false)
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  let emailValid = false
  let passwordValid = false

  function validateLogIn() {
    if (email.includes('@')) {
      setInsertDataError((prevState) => {
        return {
          ...prevState,
          eEmail: '',
        }
      })
      emailValid = true
    } else {
      setInsertDataError((prevState) => {
        return {
          ...prevState,
          eEmail: 'The email you entered is not connected to an account. Please try again!',
        }
      })
      emailValid = false
    }
    if (password.length >= 7) {
      setInsertDataError((prevState) => {
        return {
          ...prevState,
          ePassword: '',
        }
      })
      passwordValid = true
    } else {
      setInsertDataError((prevState) => {
        return {
          ...prevState,
          ePassword: 'Incorrect password!',
        }
      })
      passwordValid = false
    }
  }

  function logInHandler(e) {
    e.preventDefault()
    validateLogIn()

    if (emailValid && passwordValid) {
      console.log(emailValid, passwordValid)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          navigate('/')
          console.log('Logged in successfully:', user)
        })
        .catch((error) => {
          setInsertDataError((prevState) => ({
            ...prevState,
            eEmail: 'Login failed. Please try again',
            ePassword: ''
          }))
          console.error('Login error', error)
        })
    }
  }

  return (
    <div>
      {/* {mainTransfer && <Navigate to="/Main" />} */}
      <form onSubmit={(e) => logInHandler(e)}>
        <div>
          <div className="row justify-content-center">
            <div className="col-md-5 shadow-lg p-3 mb-5 bg-white rounded">
              <h1>Log In</h1>

              <input type='text' placeholder='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
              <p>{insertDataError.eEmail}</p>

              <input type="password" placeholder='password' className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
              <p>{insertDataError.ePassword}</p>

              <h1><button type='submit' className='btn btn-success'>Log In</button></h1>
              <span>Create An Account{""}
                <Link to='/Validation'> Here</Link></span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}