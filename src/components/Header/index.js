import { useState, useEffect } from "react";
import styles from "./Header.module.css";

/**
 * Header component
 *
 * @returns {jsx} Component
 */
export default function Header() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.headerBg}>
      <div className={styles.curtainBg}>
        <p className={styles.headerDate}>{date}</p>
      </div>
    </div>
  );
}
