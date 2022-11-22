import { RiCentosFill, RiCloseCircleFill, RiPencilFill, RiCheckboxBlankFill, RiCheckboxFill } from 'react-icons/ri';
import generateId from '../../utils/utils';
import styles from './TodoTask.module.css';

export default function TodoTask({task, removeTask, toggleTask, editTask}) {
    return (
        <div className={styles.task}>
            <div className={styles.taskContent}>
                <div className={styles.taskTitle}>{task.title}</div>
                <div className={styles.taskDescription}>{task.description}</div>
                <div className={styles.taskDate}>{task.date}</div>
                {
                !!task.files.length && <div className={styles.taskFileContainer}>
                    <div className={styles.fileText}>Files:</div>
                    {task.files.map(file=><div className={styles.taskFile} key={generateId()}><a href={file.url}>{file.name}</a></div>)}                    
                </div>
                }
            </div>
            <div className={styles.iconsBar}>                
                <RiCloseCircleFill className={styles.icon} onClick={()=>removeTask(task.id)}/>
                <RiPencilFill className={styles.icon} onClick={()=>editTask(task.id)}/>
                {!task.isCompleted && <RiCheckboxBlankFill className={styles.icon} onClick={()=>toggleTask(task.id)}/>}
                {task.isCompleted && <RiCheckboxFill className={styles.icon} onClick={()=>toggleTask(task.id)}/>}
            </div>
        </div>
    );
}