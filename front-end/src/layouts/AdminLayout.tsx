import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import styles from "../styles/layouts/AdminLayout.module.css"
import NavMenu from "../components/admin/NavMenu"

export default function AdminLayout() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_container}>
          <img src="/assets/logo.svg" alt="logo" className={styles.logo} />

          <NavMenu />
        </div>
      </header>

      <section className={styles.section}>
        <Outlet />
      </section>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}
