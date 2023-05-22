import React, { useState } from 'react';


export default function Main() {

  const [taskList, setTaskList] = useState([]);
  const [taskData, setTaskData] = useState({
    id: Date.now(),
    selectFirstName: '',
    selectName: '',
    taskName: '',
    selectImportant: '',
    startDate: '',
    sent: false
  });


  function addTask(e) {
    let newTaskData = { ...taskData }
    newTaskData.id = Date.now()
    setTaskList([...taskList, newTaskData])
    clearInputHandler(e)
  }

  function clearInputHandler(e) {
    setTaskData({
      id: Date.now(),
      selectFirstName: '',
      selectName: '',
      taskName: '',
      selectImportant: '',
      startDate: '',
      sent: false
    })
  }

  const taskListContent = taskList.map((task, index) => {

    const style = { backgroundColor: 'green' }

    return (
      <div key={index}>
        <div className='list-people' style={task.sent ? style : {}}>
          <span>{task.selectFirstName} {task.selectName}</span>
          <span>{task.taskName}</span>
          <span>{task.selectImspanortant}</span>
          <span>{task.startDate}</span>
          {!task.sent && <button className='btn btn-success' onClick={() => sendHandler(index)}>SEND</button>}
          <i className="fa fa-trash" aria-hidden="true" onClick={() => deleteTask(index)}></i>
        </div>
      </div>
    )
  })

  function sendHandler(index) {
    let newTaskData = { ...taskList[index] }
    newTaskData.sent = true
    let newTaskList = taskList.filter(item => item.id !== newTaskData.id)
    setTaskList([newTaskData, ...newTaskList])
  }


  function deleteTask(index) {
    var duparray = [...taskList]
    duparray.splice(index, 1)
    setTaskList(duparray)
  }


  return (
    <form>
      <div>
        <div className="row justify-content-center">
          <div className="col-md-5 shadow-lg p-3 mb-5 bg-white rounded">
            <h1>Keep in Touch</h1>
            <form>
              <input type="text" placeholder='First Name' className='form-control-firstName' value={taskData.selectFirstName} onChange={(e) => {
                setTaskData((prev) => {
                  prev.selectFirstName = e.target.value
                  return { ...prev }
                })
              }} />
              <input type="text" placeholder='Name' className='form-control-name' value={taskData.selectName} onChange={(e) => {
                setTaskData((prev) => {
                  prev.selectName = e.target.value
                  return { ...prev }
                })
              }} />
              <input type="text" placeholder='Insert...' className='form-control-insert' value={taskData.taskName} onChange={(e) => {
                setTaskData((prev) => {
                  prev.taskName = e.target.value
                  return { ...prev }
                })
              }} />
              <input type="date" value={taskData.startDate} onChange={(date) => {
                console.log(date)
                console.log(date.target.value)
                setTaskData((prev) => {
                  prev.startDate = date.target.value
                  return { ...prev }
                })
              }} />
            </form>
            <label>
              <span>How Important ?  </span>
              <select value={taskData.selectImportant} onChange={(e) => {
                setTaskData((prev) => {
                  prev.selectImportant = e.target.value
                  return { ...prev }
                })
              }}>
                <option value="Not so important">Not so important</option>
                <option value="Important">Important</option>
                <option value="Very important">Very important</option>
              </select>
            </label>
            <h1><button type='submit' disabled={!taskData.selectFirstName || !taskData.selectName || !taskData.taskName} className='btn btn-success' onClick={addTask}>ADD</button></h1>
            <br />
            {taskListContent}
          </div>
        </div>
      </div>
    </form>
  );
}
