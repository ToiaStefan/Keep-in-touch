import React, { useState } from 'react';
// import { Route, Switch } from 'react-router';
import { bootstrap } from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactDatePicker from 'react-datepicker';
import logo from './logo.svg';
import './App.css';
import Main from './Components/Main';
import Validation from './Components/Validation';
import Login from './Components/Login';
import EditModal from './Components/TaskList';


function App() {
  const [showValidation, setShowValidation] = useState(true)
  // const [token, setToken] = useState('')

  // if (!token) {
  //   return <Login setToken={setToken} />
  // }

  function showValidationHandler() {
    setShowValidation(false)
  }
  let shownComponent
  if (showValidation === true) {
    shownComponent = <Validation handlershowValidation={showValidationHandler} />
  } else {
    shownComponent = <Main />
  }

  return (
    <div className="App">
      {/* <BrowserRouter> */}
      {/* <Switch> */}
      {/* <Route path="/login"> */}
      {/* <login /> */}
      {/* </Route>
      </Switch> */}
      {/* </BrowserRouter> */}
      {/* {shownComponent} */}
      <Main />
      {/* <Login /> */}
      {/* <EditModal /> */}
    </div>
  )
}

export default App;
