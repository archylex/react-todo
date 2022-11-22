import styles from './ModalWindow.module.css';

export default function ModalWindow({active, onHide, children}) {
    return (
        <div className={`${styles.modalWindow} ${active ? styles.modalWindow__active : ''}`} onClick={()=>onHide()}>
           <div className={`${styles.modalWindow__content} ${active ? styles.modalWindow__content__active : ''}`} onClick={(e)=>e.stopPropagation()}>
                {children}
            </div> 
        </div>
    );
}