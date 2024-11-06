import styles from "@/styles/views/ActionsProjectView.module.css"

export default function ErrorMessage({children}: {children: React.ReactNode}) {
  return (
    <div className={styles.error}>
        {children}
    </div>
  )
}
