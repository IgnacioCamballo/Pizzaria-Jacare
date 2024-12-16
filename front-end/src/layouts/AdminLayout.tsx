import { Navigate, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

import { useAuth } from "../hooks/useAuth"
import NavMenu from "../components/admin/NavMenu"
import styles from "../styles/layouts/AdminLayout.module.css"

export default function AdminLayout() {
  const {data, isError, isLoading} = useAuth()

  if(isLoading) return (
    <div className={styles.spinner_container}>
      <div className={styles.blue_top}/>
      <div className={styles.spinner}>
        <div className={styles.cube1}></div>
        <div className={styles.cube2}></div>
      </div>
      <h4> Cargando</h4>
    </div>
  )

  if(isError) {
    return <Navigate to={"/login"}/>
  }

  if(data) return (
    <>
      <header className={styles.header}>
        <div className={styles.header_container}>
          <img src="/assets/logo.svg" alt="logo" className={styles.logo} />

          <NavMenu user={data}/>
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
