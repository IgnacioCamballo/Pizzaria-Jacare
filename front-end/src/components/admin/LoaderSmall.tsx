import styles from "@/styles/components/LoaderSmall.module.css"

export default function LoaderSmall() {
  return (
    <div className={styles.spinner}>
      <div className={styles.cube1}></div>
      <div className={styles.cube2}></div>
    </div>
  )
}
