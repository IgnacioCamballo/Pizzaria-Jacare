import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import styles from "@/styles/views/UsersView.module.css"
import UserForm from '../../components/admin/UserForm'
import { toast } from 'react-toastify'
import { createUser } from '../../api/UserAPI'

export default function CreateUser() {
  const params = useParams()
  const userID = params.currentUser

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {mutateAsync, isError} = useMutation({
    mutationFn: createUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["Users"]})
      toast.success(data)
      navigate(`/users/${userID}`)
    }
  })

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
        isCreate={true}
        createMutate={mutateAsync}
        mutationIsError={isError}
      />
    </div>
  )
}