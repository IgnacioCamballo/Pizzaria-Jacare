import styles from "@/styles/components/Loader.module.css"

export default function Loader() {
  return (
    <div className={styles.spinner_container}>
      <div className={styles.spinner}>
        <div className={styles.cube1}></div>
        <div className={styles.cube2}></div>
      </div>
      <h4> Cargando</h4>
    </div>
  )
}