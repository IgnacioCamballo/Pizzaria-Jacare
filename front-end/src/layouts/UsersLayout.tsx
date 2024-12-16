import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import styles from "../styles/layouts/AdminLayout.module.css"

export default function UsersLayout() {
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

  if(data?.rank === 1) {
    return (<Outlet />)
  } else {
    return <Navigate to={"/admin"}/>
  }
}
