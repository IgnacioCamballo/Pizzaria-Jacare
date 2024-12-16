import { Link, useParams } from 'react-router-dom'
import UserForm from '../../components/admin/UserForm'

import styles from "@/styles/views/UsersView.module.css"

export default function CreateUser() {
  const params = useParams()
  const userID = params.currentUser

  return (
    <div className={styles.container_form}>
      <h1 className={styles.titulo}>Crear Usuario</h1>
      <p className={styles.subtitulo}>Llena el formulario para crear un usuario</p>
      
      <nav className={styles.nav_link}>
        <Link
          className={styles.link_boton}
          to={`/users/${userID}`}
        >Volver a Usuarios</Link>
      </nav>
      
      <UserForm 
      
      />
    </div>
  )
}
