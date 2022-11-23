import { useState, useEffect } from "react";
import { onValue, ref, set, update } from "firebase/database";
import { db } from "./firebaseConfig";
import CustomButton from "./components/CustomButton";
import ModalWindow from "./components/ModalWindow";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import { cloneObject, emptyArrayToString } from "./utils/utils";

import "./App.css";

const DB_ROOT = "tasks";

/**
 * App component
 *
 * @returns {jsx} Component
 */
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  /**
   * init hook
   */
  useEffect(() => {
    const query = ref(db, DB_ROOT);

    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      const array = [];

      if (snapshot.exists()) {
        Object.entries(data).forEach(([_, value]) => {
          const task = {
            id: value.id,
            title: value.title,
            description: value.description,
            date: value.date,
            files: value.files === "" ? [] : value.files,
            isCompleted: value.isCompleted,
          };
          array.push(task);
        });
      }

      const newArray = array.sort((a, b) => a.date - b.date);

      setTasks([...newArray]);
    });
  }, []);
  
  /**
   * Update task on firebase database
   *
   * @param {any} task
   */
  const updateTask = (task) => {
    const updates = {};
    const newTask = cloneObject(task);
    newTask.files = emptyArrayToString(newTask.files);
    updates[`/${DB_ROOT}/${newTask.id}`] = newTask;
    update(ref(db), updates);
  };

  /**
   * Add task to state and firebase DB
   *
   * @param {any} task
   */
  const addTaskHandler = (task) => {
    setTasks((current) => [...current, task]);

    set(ref(db, `/${DB_ROOT}/${task.id}`), {
      title: task.title,
      id: task.id,
      description: task.description,
      date: task.date,
      isCompleted: task.isCompleted,
      files: emptyArrayToString(task.files),
    });
  };

  /**
   * Remove task from state and firebase DB
   *
   * @param {string} id
   */
  const removeTaskHandler = (id) => {
    const updates = {};
    updates[`/${DB_ROOT}/${id}`] = null;
    update(ref(db), updates);

    setTasks((current) => current.filter((value) => value.id !== id));
  };

  /**
   * Update flag 'isCompleted' in state and firebase DB
   *
   * @param {string} id
   */
  const toggleTaskHandler = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, isCompleted: !task.isCompleted }
          : { ...task }
      )
    );
   
    const task = tasks.filter((value) => value.id === id)[0];
    task.isCompleted = !task.isCompleted;
    task.files = emptyArrayToString(task.files);
    const updates = {};
    updates[`/${DB_ROOT}/${id}`] = task;
    update(ref(db), updates);    
  };

  /**
   * Set editedTask state by ID and show modal window
   *
   * @param {string} id
   */
  const editTaskHandler = (id) => {
    const task = tasks.filter((value) => value.id === id)[0];
    setEditedTask(task);
    showModalWindow();
  };

  /**
   * Sets modalActive state to show window
   */
  const showModalWindow = () => {
    setModalActive(true);
  };

  /**
   * Hide modal window and clear edited task state
   */
  const hideModalWindow = () => {
    if (editedTask) {
      setEditedTask(null);
    }

    setModalActive(false);
  };

  return (
    <div className="App">
      <Header />
      <CustomButton className="circleButton" onClick={showModalWindow}>
        +
      </CustomButton>
      <ModalWindow active={modalActive} onHide={hideModalWindow}>
        <TodoForm
          task={editedTask}
          addTask={addTaskHandler}
          callback={hideModalWindow}
          updateTask={updateTask}
        />
      </ModalWindow>
      <TodoList
        tasks={tasks}
        removeTask={removeTaskHandler}
        toggleTask={toggleTaskHandler}
        editTask={editTaskHandler}
      />
    </div>
  );
}
