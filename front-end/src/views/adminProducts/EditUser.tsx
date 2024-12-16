import { Link, useNavigate, useParams } from 'react-router-dom'
import UserForm from '../../components/admin/UserForm'

import styles from "@/styles/views/UsersView.module.css"
import { useQuery } from '@tanstack/react-query'
import { getUserById } from '../../api/UserAPI'

export default function EditUser() {
  const params = useParams()
  const {userID, editingUser} = params
  const navigate = useNavigate()

  const { isError} = useQuery({
    queryKey: ["CurrentFullUser"],
    queryFn: () => getUserById(editingUser!)
  })

  if(isError) {(navigate("/404"))}

  return (
    <div className={styles.container_form}>
      <h1 className={styles.titulo}>Editar Usuario</h1>
      <p className={styles.subtitulo}>Llena el formulario para editar un usuario</p>
      
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
