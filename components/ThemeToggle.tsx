import type React from "react"
import { useTheme } from "@/context/ThemeContext"
import styles from "@/styles/ThemeToggle.module.css"

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className={`${styles.toggle} ${theme === "dark" ? styles.dark : ""}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className={styles.toggle__handler}>
        <span className={`${styles.crater} ${styles.crater__1}`}></span>
        <span className={`${styles.crater} ${styles.crater__2}`}></span>
        <span className={`${styles.crater} ${styles.crater__3}`}></span>
      </span>
      <span className={`${styles.star} ${styles.star__1}`}></span>
      <span className={`${styles.star} ${styles.star__2}`}></span>
      <span className={`${styles.star} ${styles.star__3}`}></span>
      <span className={`${styles.star} ${styles.star__4}`}></span>
      <span className={`${styles.star} ${styles.star__5}`}></span>
      <span className={`${styles.star} ${styles.star__6}`}></span>
    </button>
  )
}

export default ThemeToggle

