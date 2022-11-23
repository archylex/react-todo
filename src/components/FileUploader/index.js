import CustomInput from "../CustomInput";
import generateId from "../../utils/utils";
import { RiCloseCircleFill } from "react-icons/ri";
import styles from "./FileUploader.module.css";

export default function FileUploader({
  selectedFiles,
  onFileSelectSuccess,
  onFileSelectError,
  onRemoveFile,
}) {
  /**
   * Checks the file for size and uploads it
   *
   * @param {any} e Event
   */
  const handleFileInput = (e) => {
    const file = e.target.files[0];

    if (file.size > 102400000) {
      onFileSelectError({ error: "File size > 100MB" });
    } else {
      file["id"] = generateId();
      onFileSelectSuccess(file);
    }
  };

  return (
    <div>
      {selectedFiles.map((file) => (
        <div className={styles.fileBlock} key={generateId()}>
          <p>{file.name}</p>
          <div className={styles.iconsBar}>
            <RiCloseCircleFill
              className={`${styles.icon} ${styles.removeIcon}`}
              onClick={() => onRemoveFile(file.id)}
            />
          </div>
        </div>
      ))}
      <label htmlFor="inputFile" className={styles.labelFile}>
        Attach File
        <CustomInput
          id="inputFile"
          className={styles.uploadButton}
          type="file"
          onChange={handleFileInput}
        />
      </label>
    </div>
  );
}
