import styles from './CustomButton.module.css';

/**
 * Button component
 * 
 * @param {any} props Some properties
 * @returns {jsx} Component
 */
export default function CustomButton(props) {
    const {children, disabled = false} = props;

    return <button className={styles.customButton} {...props} disabled={disabled}>{children}</button>
}