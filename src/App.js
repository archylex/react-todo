import { useState } from 'react';
import CustomButton from './components/CustomButton';
import ModalWindow from './components/ModalWindow';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const addTaskHandler = (task) => {
    setTasks(current => [
      ...current,
      task 
    ])
  }

  const removeTaskHandler = (id) => {
    setTasks(current => current.filter(value => value.id !== id));
  }

  const toggleTaskHandler = (id) => {
    setTasks(current => current.map((task => task.id === id ? {...task, isCompleted: !task.isCompleted} : {...task})));
  }

  const editTaskHandler = (id) => {
    const task = tasks.filter(value => value.id === id)[0];
    setEditedTask(task);
    showModalWindow();
  }

  const showModalWindow = () => {
    setModalActive(true);
  }

  const hideModalWindow = () => {
    if (editedTask) {
      setEditedTask(null);
    }
    
    setModalActive(false);
  }

  return (
    <div className='App'>
      <h1>Todo</h1>
      <CustomButton onClick={showModalWindow}>Add Todo</CustomButton>
      <ModalWindow active={modalActive} onHide={hideModalWindow}>
        <TodoForm task={editedTask} addTask={addTaskHandler} callback={hideModalWindow} />
      </ModalWindow>      
      <TodoList tasks={tasks} removeTask={removeTaskHandler} toggleTask={toggleTaskHandler} editTask={editTaskHandler}/>            
    </div>
  );
}

