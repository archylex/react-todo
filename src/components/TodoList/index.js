import TodoTask from '../TodoTask';
import styles from './TodoList.module.css';

export default function TodoList({tasks, removeTask, toggleTask, editTask}) {
    return (        
        <div className={styles.listContainer}>
            {!tasks.length && <h2>Empty</h2>}
            {tasks.map(task => <TodoTask key={task.id} task={task} removeTask={removeTask} toggleTask={toggleTask} editTask={editTask} />)}
        </div>
    );
}