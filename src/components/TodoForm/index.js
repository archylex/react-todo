import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./../../firebaseConfig";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import FileUploader from "../FileUploader";
import generateId, { toLocalDate } from "./../../utils/utils";
import styles from "./TodoForm.module.css";

const UPLOAD_FOLDER = "/files/";

/**
 * Todo Form Component for create and modify task
 *
 * @param {object} task The todo
 * @param {function} addTask Add todo/task to array in task state
 * @param {function} updateTask Update todo/task in state
 * @param {function} callback Execute function after submit
 * @returns {jsx} Component
 */
export default function TodoForm({
  task,
  addTask,
  updateTask,
  callback = null,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState(Date.now());
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [percent, setPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Fill all inputs if task exists
   */
  useEffect(() => {
    clearFields();
    if (!task) return;
    setTitle(task.title);
    setDescription(task.description);
    setExpirationDate(task.date);
    setSelectedFiles(task.files);
  }, [task]);

  /**
   * Clear all inputs
   */
  const clearFields = () => {
    setTitle("");
    setDescription("");
    setExpirationDate(Date.now());
    setSelectedFiles([]);
  };

  /**
   * Remove file from state by ID
   *
   * @param {string} id The id of file
   */
  const onRemoveFileHandler = (id) => {
    setSelectedFiles((current) => current.filter((value) => value.id !== id));
  };

  /**
   * Submit data from form and execute callback function
   *
   * @param {any} event The click event
   */
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (task) {
      task.title = title;
      task.description = description;
      task.date = expirationDate;
      task.files = selectedFiles;

      updateTask(task);
    } else {
      const task = {
        id: generateId(),
        title,
        description,
        date: expirationDate,
        files: selectedFiles,
        isCompleted: false,
      };

      addTask(task);
    }

    if (typeof callback === "function") {
      callback();
    }
  };

  /**
   * Change title state
   *
   * @param {any} event
   */
  const onChangeTitleHandler = (event) => setTitle(event.target.value);

  /**
   * Change description state
   *
   * @param {any} event
   */
  const onChangeDescriptionHandler = (event) =>
    setDescription(event.target.value);

  /**
   * Change date state
   *
   * @param {any} event
   */
  const onChangeDateHandler = (event) => {
    if (!isNaN(Date.parse(event.target.value))) {
      setExpirationDate(new Date(event.target.value).getTime());
    }
  };

  /**
   * Upload file to firebase storage,
   * Change percent, selected files and isLoad states
   *
   * @param {any} file
   */
  const onFileUploadHandler = (file) => {
    const storageRef = ref(storage, `${UPLOAD_FOLDER}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setIsLoaded((current) => !current);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      null,
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const newFile = {
            id: file.id,
            name: file.name,
            url: url,
            size: file.size,
          };
          setSelectedFiles((current) => [...current, newFile]);
        });
        setIsLoaded((current) => !current);
      }
    );
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <CustomInput
        type="text"
        placeholder="Title"
        value={title}
        onChange={onChangeTitleHandler}
      />
      <CustomInput
        type="text"
        placeholder="Description"
        value={description}
        onChange={onChangeDescriptionHandler}
      />
      <CustomInput
        type="datetime-local"
        placeholder="Expiration Date"
        value={toLocalDate(new Date(expirationDate))}
        onChange={onChangeDateHandler}
      />

      {isLoaded && <p className={styles.percentLoader}>{percent}%</p>}
      {!isLoaded && (
        <FileUploader
          selectedFiles={selectedFiles}
          onRemoveFile={onRemoveFileHandler}
          onFileSelectSuccess={onFileUploadHandler}
          onFileSelectError={({ error }) => alert(error)}
        />
      )}

      {!isLoaded && (
        <CustomButton type="submit">{task ? "Edit" : "Add"}</CustomButton>
      )}
    </form>
  );
}
