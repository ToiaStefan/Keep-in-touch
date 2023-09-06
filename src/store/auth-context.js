import React, { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, app } from '../utils.js';
import { getDatabase, ref, get, set } from 'firebase/database';

let logoutTimer

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => { },
  logout: () => { }
})

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  return {
    token: storedToken,
  }
}

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [userId, setUserId] = useState(null)
  const [token, setToken] = useState(initialToken)

  const userIsLoggedIn = !!token

  const logoutHandler = useCallback(() => {
    setToken(null);
    auth.signOut()
    localStorage.removeItem('token');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, [])

  const loginHandler = (token) => {
    setToken(token)
    localStorage.setItem('token', token)
  }

  const createUserInDataBase = (user) => {
    const db = getDatabase()
    const userRef = ref(db, 'users/' + user.uid)

    const userData = {
      email: user.email,
      uid: user.uid,
      tasks: [{ name: 'test', value: 10 }]
    }
    set(userRef, userData)
      .then(() => {
        console.log('User data created successfully')
      })
      .catch((error) => {
        console.log('Error creating user data', error)
      })
  }

  const fetchUserData = async (user) => {
    const db = getDatabase()
    const userRef = ref(db, 'users/' + userId)

    try {
      const snapshot = await get(userRef)
      if (snapshot.exists()) {
        const userData = snapshot.val()
        console.log('User Data:', userData)
      } else {
        console.log('User data does not exist.')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in", user)
        loginHandler(user.accessToken)
        setUserId(user.uid)
      } else {
        console.log("User is signed out")
        logoutHandler()
      }
    })
    return () => unSubscribe()
  }, [])

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userId: userId,
    login: loginHandler,
    logout: logoutHandler,
    createUserInDataBase: createUserInDataBase,
    fetchUserData: fetchUserData
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext