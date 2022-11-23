import styles from "./CustomInput.module.css";

/**
 * Input component
 *
 * @param {any} props Some properties
 * @returns {jsx} Component
 */
export default function CustomInput(props) {
  return <input className={styles.customInput} {...props} />;
}
