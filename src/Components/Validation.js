import React, { useEffect, useState } from "react";

export default function Validation(props) {

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassowrd, setConfirmPassword] = useState('')

  const [insertDataError, setInsertDataError] = useState({
    eUserName: '',
    eEmail: '',
    ePassword: '',
    eConfirmPassword: '',
  })

  const [userNameColor, setUserNameColor] = useState('')
  const [emailColor, setEmailColor] = useState('')
  const [passwordColor, setPasswordColor] = useState('')
  const [confirmPasswordColor, setConfirmPasswordColor] = useState('')

  let userNameValid = false
  let passwordValid = false
  let emailValid = false
  let confirmPassowrdValid = false

  // function userNameChangeHandler(e) {
  //   if (userName.length >= 8) {
  //     setInsertDataError((prevState) => {
  //       return {
  //         ...prevState,
  //         eUserName: ''
  //       }
  //     })
  //     userNameValid = true
  //     setUserNameColor('')
  //   }
  //   else {
  //     userNameValid = false
  //     setInsertDataError((prevState) => {
  //       return {
  //         ...prevState,
  //         eUserName: 'username must be 7 characters long'
  //       }
  //     })
  //     setUserNameColor('red')
  //   }
  //   setUserName(e.target.value)
  // }

  // function emailChangeHandler(e) {
  //   if (email.includes('@')) {
  //     setInsertDataError((prevState) => {
  //       return {
  //         ...prevState,
  //         eEmail: ''
  //       }
  //     })
  //     emailValid = true
  //     setEmailColor('')
  //   }
  //   else {
  //     emailValid = false
  //     setInsertDataError((prevState) => {
  //       return {
  //         ...prevState,
  //         eEmail: 'email should incloude @'
  //       }
  //     })
  //     setEmailColor('red')
  //   }
  //   setEmail(e.target.value)
  // }

  // function passwordChangeHandler(e) {
  //   setPassword(e.target.value)
  //   if (password.length >= 7) {
  //     setInsertDataError((prevState) => {
  //       return {
  //         ...prevState,
  //         ePassword: ''
  //       }
  //     })
  //     passwordValid = true
  //     setPasswordColor('')
  //   }
  //   else {
  //     passwordValid = false
  //     setInsertDataError((prevState) => {
  //       return {
  //         ...prevState,
  //         ePassword: 'password should be 7 characters long'
  //       }
  //     })
  //     setPasswordColor('red')
  //   }
  // }

  // function confirmPassowrdChangeHandler(e) {
  // setConfirmPassword(e.target.value)
  // if (password !== '' && password === confirmPassowrd) {
  //   setInsertDataError((prevState) => {
  //     return {
  //       ...prevState,
  //       eConfirmPassword: ''
  //     }
  //   })
  //   confirmPassowrdValid = true
  //   setConfirmPasswordColor('')
  // }
  // else {
  //   setInsertDataError((prevState) => {
  //     return {
  //       ...prevState,
  //       eConfirmPassword: 'passwords not match'
  //     }
  //   })
  //   confirmPassowrdValid = false
  //   setConfirmPasswordColor('red')
  // }
  // setConfirmPassword((prevState) => {
  //   return e.target.value
  // })
  // setConfirmPassword(e.target.value)
  // }

  console.log(userName)

  function validate() {
    if (userName.length >= 8) {
      setInsertDataError((prevState) => {
        return {
          ...prevState,
          eUserName: ''
        }
      })
      userNameValid = true
      setUserNameColor('')
    }
    else {
      userNameValid = false
      setInsertDataError((prevState) => {
        return {
          ...prevState,
          eUserName: 'username must be 7 characters long'
        }
      })
      setUserNameColor('red')
    }

    if (email.includes('@')) {
      setInsertDataError((prevState) => {
        return {
          ...prevState,
          eEmail: ''
        }
      })
      emailValid = true
      setEmailColor('')
    }
    else {
      emailValid = false
      setInsertDataError((prevState) => {
        return {
          ...prevState,
          eEmail: 'email should incloude @'
        }
      })
      setEmailColor('red')
    }

    if (password.length >= 7) {
      setInsertDataError((prevState) => {
        return {
          ...prevState,
          ePassword: ''
        }
      })
      passwordValid = true
      setPasswordColor('')
    }
    else {
      passwordValid = false
      setInsertDataError((prevState) => {
        return {
          ...prevState,
          ePassword: 'password should be 7 characters long'
        }
      })
      setPasswordColor('red')
    }

    if (password !== '' && password === confirmPassowrd) {
      setInsertDataError((prevState) => {
        return {
          ...prevState,
          eConfirmPassword: ''
        }
      })
      confirmPassowrdValid = true
      setConfirmPasswordColor('')
    }
    else {
      setInsertDataError((prevState) => {
        return {
          ...prevState,
          eConfirmPassword: 'passwords not match'
        }
      })
      confirmPassowrdValid = false
      setConfirmPasswordColor('red')
    }
    // setConfirmPassword((prevState) => {
    //   return e.target.value
    // })
    // setConfirmPassword(e.target.value)



    // if (!userNameValid || !emailValid || !passwordValid || !confirmPassowrdValid) {
    //   return props.handlerShowLogIn()
    // }
  }

  function submitHandler(e) {
    e.preventDefault()
    validate()

    if (userNameValid && emailValid && passwordValid && confirmPassowrdValid) {
      return props.handlerShowLogIn()
    }
  }



  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <div>
        <div className="row justify-content-center">

          <div className="col-md-5 shadow-lg p-3 mb-5 bg-white rounded">

            <h1>Create an account</h1>

            <input type="text" placeholder='username' className="form-control" style={{ borderColor: userNameColor }} value={userName} onChange={(e) => setUserName(e.target.value)} />

            <span>{insertDataError.eUserName}</span>

            <input type="text" placeholder='email' className="form-control" value={email} style={{ borderColor: emailColor }} onChange={(e) => setEmail(e.target.value)} />

            <span>{insertDataError.eEmail}</span>

            <input type="password" placeholder='password' className="form-control" value={password} style={{ borderColor: passwordColor }} onChange={(e) => setPassword(e.target.value)} />

            <span>{insertDataError.ePassword}</span>

            <input type="password" placeholder='confirm password' className="form-control" value={confirmPassowrd} style={{ borderColor: confirmPasswordColor }} onChange={(e) => setConfirmPassword(e.target.value)} />

            <span>{insertDataError.eConfirmPassword}</span>

            <h1><button type="submit" /*disabled={!userNameValid || !emailValid || !passwordValid || !confirmPassowrdValid}*/ className='btn btn-success'  >SUBMIT</button></h1>

          </div>

        </div>

      </div>
    </form>

  )

}