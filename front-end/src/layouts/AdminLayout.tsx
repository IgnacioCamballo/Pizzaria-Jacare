import { Navigate, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

import { useAuth } from "../hooks/useAuth"
import NavMenu from "../components/admin/NavMenu"
import styles from "../styles/layouts/AdminLayout.module.css"
import Loader from "../components/admin/Loader"

export default function AdminLayout() {
  const {data, isError, isLoading} = useAuth()

  if(isLoading) return (
    <>
      <div className={styles.blue_top}/>
      <Loader />
    </>
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
