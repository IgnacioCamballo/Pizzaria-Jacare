import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import styles from "@/styles/views/UsersView.module.css"
import { getUserById, UpdateUser } from '../../api/UserAPI'
import UserForm from '../../components/admin/UserForm'
import Loader from '../../components/admin/Loader'

export default function EditUser() {
  const params = useParams()
  const {currentUser, editingUser} = params
  
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  //Gets the editing user
  const {data, isLoading} = useQuery({
    queryKey: ["CurrentFullUser"],
    queryFn: () => getUserById(editingUser!)
  })

  const {mutateAsync, isError} = useMutation({
    mutationFn: UpdateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["Users"]})
      toast.success(data)
      navigate(`/users/${currentUser}`)
    }
  })

  if(isLoading) return <Loader />

  if (data) return (
    <div className={styles.container_form}>
      <h1 className={styles.titulo}>Editar Usuario</h1>
      <p className={styles.subtitulo}>Llena el formulario para editar un usuario</p>
      
      <nav className={styles.nav_link}>
        <Link
          className={styles.link_boton}
          to={`/users/${currentUser}`}
        >Volver a Usuarios</Link>
      </nav>
      
      <UserForm 
        isCreate={false}
        editingUser={data}
        editMutate={mutateAsync}
        mutationIsError={isError}
      />
    </div>
  )
}
