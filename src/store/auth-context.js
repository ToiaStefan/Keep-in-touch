import React, { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, app } from '../utils.js'

let logoutTimer;

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
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken)

  const userIsLoggedIn = !!token

  const logoutHandler = useCallback(() => {
    setToken(null);
    auth.signOut()
    localStorage.removeItem('token');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in", user)
        loginHandler(user.accessToken)
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
    login: loginHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;