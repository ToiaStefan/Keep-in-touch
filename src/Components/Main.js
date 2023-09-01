import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';


export default function Main(props) {

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

  const getTask = async () => {
    try {
      const respones = await fetch('https://tst-react-keepintouch-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
      const json = await respones.json()
      const processedTasks = []
      for (const key in json) {
        processedTasks.push({
          id: key,
          ...json[key],
          date: new Date(json[key].date)
        })
      }
      setTaskList(processedTasks)
    } catch (error) {
      console.error('Error retriving:', error)
    }
  }

  const deleteTaskJ = async (id) => {
    try {
      const response = await fetch(
        `https://tst-react-keepintouch-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  async function addTask(e) {
    e.preventDefault()
    let { id, ...newTaskData } = { ...taskData }
    try {
      const respones = await fetch(
        `https://tst-react-keepintouch-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`
        , {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newTaskData })
        })
      const result = await respones.json()
      setTaskList([...taskList, { ...taskData, id: result.name }])
    } catch (error) {
      console.error('Error adding task', error)
    }
    clearInputHandler(e)
  }

  useEffect(() => {
    getTask()
  }, [])

  function clearInputHandler() {
    setTaskData({
      ...taskData,
      id: Date.now(),
      selectFirstName: '',
      selectName: '',
      taskName: '',
      selectImportant: '',
      startDate: '',
      sent: false
    })
  }

  async function updateTask(task) {
    const { id, ...taskBody } = task
    console.log(id, taskBody)
    try {
      const response = await fetch(
        `https://tst-react-keepintouch-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskBody)
      })
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  return (
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
          <h1><button type="button" disabled={!taskData.selectFirstName || !taskData.selectName || !taskData.taskName} className='btn btn-success' onClick={addTask}>ADD</button></h1>
          <br />
          <div style={{ height: '300px', overflow: 'auto' }}>
            <TaskList taskList={taskList} setTaskList={setTaskList} deleteTaskJ={deleteTaskJ} updateTask={updateTask} />
          </div>
        </div>
      </div>
    </div>
  );
}
