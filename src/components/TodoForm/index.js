import { useState } from 'react';
import {ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from './../../firebaseConfig';
import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput';
import FileUploader from '../FileUploader';
import generateId from './../../utils/utils';
import styles from './TodoForm.module.css';

export default function TodoForm({task, addTask, callback = null}) {    
    const t = task?.title;
    console.log(`this task: ${t}`);
    const [title, setTitle] = useState(t);
    const [description, setDescription] = useState(task ? task.description : '');
    const [expirationDate, setExpirationDate] = useState(task ? task.date : 0);
    const [selectedFile, setSelectedFile] = useState(task ? task.files : []);

    
    console.log(`this title: ${title}`);
    console.log(`this task2: ${task?.title}`);

    const clearFields = () => {
        setTitle('');
        setDescription('');
        setExpirationDate(0);
        setSelectedFile([]);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (task) {
            task.title = title;
            task.description = description;
            task.date = expirationDate;
            task.files = selectedFile; 
        } else {
            const task = {
                id: generateId(),
                title,
                description,
                date: expirationDate,
                files: selectedFile,
                isCompleted: false
            };

            addTask(task);
        }

        clearFields();

        if (typeof callback === 'function') {
            callback();
        }
    }

    const onChangeTitleHandler = (event) => setTitle(event.target.value);

    const onChangeDescriptionHandler = (event) => setDescription(event.target.value);

    const onChangeDateHandler = (event) => setExpirationDate(event.target.value);

    return (
        <form className={styles.form} onSubmit={onSubmitHandler}>
            <CustomInput type="text" placeholder="Title" value={title} onChange={onChangeTitleHandler} />
            <CustomInput type="text" placeholder="Description" value={description} onChange={onChangeDescriptionHandler} />
            <CustomInput type="text" placeholder="Expiration Date" value={expirationDate} onChange={onChangeDateHandler} />

            <FileUploader 
                onFileSelectSuccess={(file) => {                     
                    const storageRef = ref(storage, `/files/${file.name}`)
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const percent = Math.round(
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                            );
                 
                            // update progress
                            console.log(percent);
                            //setPercent(percent);
                        },
                        (err) => console.log(err),
                        () => {
                            // download url
                            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                                console.log(url);
                                file['url'] = url;
                                setSelectedFile((current) => [...current, file])
                            });
                        }
                    ); 

                    }}
                onFileSelectError={({ error }) => alert(error)} />

            <CustomButton type="submit">{ task ? 'Edit' : 'Add'}</CustomButton>
        </form>
    )
}