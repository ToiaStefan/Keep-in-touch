import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Components/Main';
import Validation from './Components/Validation';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactDatePicker from 'react-datepicker';




function App() {
  const [showLogIn, setShowLogIn] = useState(true);
  function showLogInHandler() {
    setShowLogIn(false)
  }
  let shownComponent
  if (showLogIn === true) {
    shownComponent = <Validation handlerShowLogIn={showLogInHandler} />
  } else {
    shownComponent = <Main />
  }
  return (
    <div className="App">
      {shownComponent}
    </div>
  )
}

export default App;
