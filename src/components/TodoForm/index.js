import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./../../firebaseConfig";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import FileUploader from "../FileUploader";
import generateId, { toLocalDate } from "./../../utils/utils";
import styles from "./TodoForm.module.css";

const UPLOAD_FOLDER = "/files/";

const initialState = {
  id: generateId(),
  title: "",
  description: "",
  date: Date.now(),
  files: [],
  isCompleted: false,
  percent: 0,
  isLoaded: false,
};

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
  const [formState, setFormState] = useState(initialState);

  /**
   * Fill all inputs if task exists
   */
  useEffect(() => {
    clearFields();

    if (task) {
      setFormState((f) => {
        return {
          ...f,
          id: task.id,
          title: task.title,
          description: task.description,
          date: task.date,
          files: task.files,
          isCompleted: task.isCompleted,
        };
      });
    }
  }, [task]);

  /**
   * Clear all inputs
   */
  const clearFields = () => {
    setFormState((f) => initialState);
  };

  /**
   * Remove file from state by ID
   *
   * @param {string} id The id of file
   */
  const onRemoveFileHandler = (id) => {
    setFormState((f) => {
      return {
        ...f,
        files: f.files.filter((value) => value.id !== id),
      };
    });
    //setSelectedFiles((current) => current.filter((value) => value.id !== id));
  };

  /**
   * Submit data from form and execute callback function
   *
   * @param {any} event The click event
   */
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (task) {
      updateTask(formState);
    } else {
      addTask(formState);
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
  const onChangeTitleHandler = (event) =>
    setFormState((f) => {
      return { ...f, title: event.target.value };
    });

  /**
   * Change description state
   *
   * @param {any} event
   */
  const onChangeDescriptionHandler = (event) =>
    setFormState((f) => {
      return { ...f, description: event.target.value };
    });

  /**
   * Change date state
   *
   * @param {any} event
   */
  const onChangeDateHandler = (event) => {
    if (!isNaN(Date.parse(event.target.value))) {
      setFormState((f) => {
        return {
          ...f,
          date: new Date(event.target.value).getTime(),
        };
      });
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

    setFormState((f) => {
      return { ...f, isLoaded: !f.isLoaded };
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setFormState((f) => {
          return { ...f, percent: percent };
        });
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

          setFormState((f) => {
            return { ...f, files: [...f.files, newFile] };
          });
        });

        setFormState((f) => {
          return { ...f, isLoaded: !f.isLoaded };
        });
      }
    );
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <CustomInput
        type="text"
        placeholder="Title"
        value={formState.title}
        onChange={onChangeTitleHandler}
      />
      <CustomInput
        type="text"
        placeholder="Description"
        value={formState.description}
        onChange={onChangeDescriptionHandler}
      />
      <CustomInput
        type="datetime-local"
        placeholder="Expiration Date"
        value={toLocalDate(new Date(formState.date))}
        onChange={onChangeDateHandler}
      />

      {formState.isLoaded && (
        <p className={styles.percentLoader}>{formState.percent}%</p>
      )}
      {!formState.isLoaded && (
        <FileUploader
          selectedFiles={formState.files}
          onRemoveFile={onRemoveFileHandler}
          onFileSelectSuccess={onFileUploadHandler}
          onFileSelectError={({ error }) => alert(error)}
        />
      )}

      {!formState.isLoaded && (
        <CustomButton type="submit">{task ? "Edit" : "Add"}</CustomButton>
      )}
    </form>
  );
}
