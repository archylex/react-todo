import { useRef } from 'react'
import CustomInput from '../CustomInput';

export default function FileUploader ({onFileSelectSuccess, onFileSelectError}) {
    const fileInput = useRef(null);

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        
        if (file.size > 1024000) {
            onFileSelectError({ error: "File size > 10MB" });
        } else { 
            onFileSelectSuccess(file);
        }
    }

    return (
        <div>
            <CustomInput type="file" onChange={handleFileInput} />
        </div>
    );
}