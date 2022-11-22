import styles from './CustomInput.module.css';

export default function CustomInput(props) {
    return (
        <input className={styles.customInput} {...props} />
    );
}