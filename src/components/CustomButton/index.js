import styles from './CustomButton.module.css';

export default function CustomButton(props) {
    const {children, disabled = false} = props;

    return <button className={styles.customButton} {...props} disabled={disabled}>{children}</button>
}