import styles from "./ModalWindow.module.css";

/**
 * Modal window component
 *
 * @param {boolean} active Show/hide window
 * @param {function} onHide Function to close the window
 * @param {any} children Children elements/components
 * @returns {jsx} Component
 */
export default function ModalWindow({ active, onHide, children }) {
  return (
    <div
      className={`${styles.modalWindow} ${
        active ? styles.modalWindow__active : ""
      }`}
      onClick={() => onHide()}
    >
      <div
        className={`${styles.modalWindow__content} ${
          active ? styles.modalWindow__content__active : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
