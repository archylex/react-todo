import {
  RiCloseCircleFill,
  RiPencilFill,
  RiCheckboxBlankFill,
  RiCheckboxFill,
  RiAttachment2,
} from "react-icons/ri";
import generateId from "../../utils/utils";
import styles from "./TodoTask.module.css";

/**
 * Todo component
 *
 * @param {object} task The todo/task
 * @param {function} removeTask Remove task from state by ID
 * @param {function} toggleTask Changle task flag 'isCompleted' from state
 * @param {function} editTask Update task from state
 * @returns
 */
export default function TodoTask({ task, removeTask, toggleTask, editTask }) {
  return (
    <div
      className={`${styles.task} ${
        task.isCompleted
          ? styles.completed
          : new Date(task.date) < Date.now()
          ? styles.expired
          : ""
      }`}
    >
      <div className={styles.taskContent}>
        <div className={styles.taskTitle}>{task.title}</div>
        <div className={styles.taskDescription}>{task.description}</div>
        <div className={styles.taskDate}>
          {new Date(task.date).toLocaleString()}
        </div>
        {!!task.files.length && (
          <div className={styles.taskFileContainer}>
            {task.files.map((file) => (
              <div className={styles.taskFile} key={generateId()}>
                <RiAttachment2 className={styles.attachIcon} />
                <a href={file.url}>
                  <strong>{file.name}</strong> (
                  {Math.ceil(Number(file.size) / 1024)}KiB)
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.iconsBar}>
        <RiCloseCircleFill
          className={`${styles.icon} ${styles.removeIcon}`}
          onClick={() => removeTask(task.id)}
        />
        <RiPencilFill
          className={`${styles.icon} ${styles.editIcon}`}
          onClick={() => editTask(task.id)}
        />
        {!task.isCompleted && (
          <RiCheckboxBlankFill
            className={`${styles.icon} ${styles.checkIcon}`}
            onClick={() => toggleTask(task.id)}
          />
        )}
        {task.isCompleted && (
          <RiCheckboxFill
            className={`${styles.checkedIcon} ${styles.checkIcon}`}
            onClick={() => toggleTask(task.id)}
          />
        )}
      </div>
    </div>
  );
}
