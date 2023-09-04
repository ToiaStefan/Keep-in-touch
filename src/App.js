import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { bootstrap } from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactDatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Main from './Components/Main';
import Validation from './Components/Validation';
import Login from './Components/Login';
import EditModal from './Components/TaskList';
import { useContext } from 'react';
import AuthContext from './store/auth-context';

function App() {
  // const [showValidation, setShowValidation] = useState(true)
  // const [loggedIn, setLoggedIn] = useState(false)
  const authContext = useContext(AuthContext)

  // if (!token) {
  //   return <Login setAuthToken={setAuthToken} />
  // } else {
  //   return <Main />
  // }

  // function showValidationHandler() {
  //   setShowValidation(false)
  // }
  // let shownComponent
  // if (showValidation === true) {
  //   shownComponent = <Validation handlershowValidation={showValidationHandler} />
  // } else {
  //   shownComponent = <Main />
  // }

  return (
    <div className="App">
      <Router>
        <Routes>
          {!authContext.token && <><Route path="/Validation" element={<Validation />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Main" element={<Main />} /></>}
          {authContext.token ? (<Route path="/" element={<Main />} />) : (<Route path="/" element={<Validation />} />)}
        </Routes>
      </Router>
    </div>
  )
}

export default App;
