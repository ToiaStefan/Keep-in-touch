import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

export default function TaskList(props) {

  const [selectedTask, setSelectedTask] = useState({
    ...props.taskData,
    id: Date.now(),
    selectFirstName: '',
    selectName: '',
    taskName: '',
    selectImportant: '',
    startDate: '',
    sent: false
  });
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  }
  const handleOpenModal = () => setShowModal(true);

  function deleteTask(index) {
    var duparray = [...props.taskList]
    let deleted = duparray.splice(index, 1)
    props.setTaskList(duparray)
    props.deleteTaskJ(deleted[0].id)
  }

  function sendHandler(index) {
    let newTaskData = { ...props.taskList[index] }
    newTaskData.sent = true
    let newTaskList = props.taskList.filter(item => item.id !== newTaskData.id)
    props.setTaskList([newTaskData, ...newTaskList])
  }

  const openEditModalHandler = (task) => {
    setSelectedTask(task)
    handleOpenModal();
  }

  const saveChangesHandler = (task) => {
    props.updateTask(task)
    setShowModal(false)
  }

  const taskListContent = props.taskList.map((task, index) => {
    const listPeopleStyle = task.sent ? { backgroundColor: 'green' } : {}
    return (
      <div key={index} className='list-people' style={listPeopleStyle}>
        <span onClick={() => openEditModalHandler(task)}>{task.selectFirstName} {task.selectName}</span>
        <span onClick={() => openEditModalHandler(task)}>{task.taskName}</span>
        <span onClick={() => openEditModalHandler(task)}>{task.selectImportant}</span>
        <span onClick={() => openEditModalHandler(task)}>{task.startDate}</span>
        {!task.sent && (<button className='btn btn-success' onClick={() => sendHandler(index)}>SEND</button>)}
        <i className="fa fa-trash" aria-hidden="true" onClick={() => deleteTask(index)}></i>
      </div>
    )
  })

  return (
    <>
      <Form onClick={handleOpenModal} />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTask.selectFirstName} {selectedTask.selectName}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: 'inline', width: '90%' }}>
          <input type="text" value={selectedTask.taskName} placeholder='Insert...' className='form-control-firstName'
            onChange={(text) => {
              setSelectedTask((prev) => {
                prev.taskName = text.target.value;
                return { ...prev };
              });
            }}
          />
          <input
            type="date"
            value={selectedTask.startDate}
            onChange={(date) => {
              setSelectedTask((prev) => {
                prev.startDate = date.target.value;
                return { ...prev };
              });
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <span>How Important? </span>
            <select
              value={selectedTask.selectImportant}
              onChange={(e) => {
                setSelectedTask((prev) => {
                  prev.selectImportant = e.target.value;
                  return { ...prev };
                });
              }}
            >
              <option value="Not so important">Not so important</option>
              <option value="Important">Important</option>
              <option value="Very important">Very important</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => saveChangesHandler(selectedTask)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {taskListContent}
    </>
  );
}


