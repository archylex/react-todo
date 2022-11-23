import TodoTask from "../TodoTask";
import styles from "./TodoList.module.css";

/**
 * Task list component
 * View todos
 *
 * @param {array} tasks The tasks state
 * @param {function} removeTask Remove task from state
 * @param {function} toggleTask Changle task flag 'isCompleted' from state
 * @param {function} editTask Update task from state
 * @returns {jsx} Component
 */
export default function TodoList({ tasks, removeTask, toggleTask, editTask }) {
  return (
    <div className={styles.listContainer}>
      {!tasks.length && <h2>Empty</h2>}
      {tasks.map((task) => (
        <TodoTask
          key={task.id}
          task={task}
          removeTask={removeTask}
          toggleTask={toggleTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}
