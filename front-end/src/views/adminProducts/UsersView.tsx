import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import styles from "@/styles/views/UsersView.module.css"
import { DeleteUser, getAllUsers } from '../../api/UserAPI'
import { AuthUser } from '../../types/usersTypes'

import UserItem from '../../components/admin/UserItem'
import AlertModal from '../../components/admin/AlertModal'

const emptyUser = {
  name: "",
  rank: 0,
  _id: ""
}

export default function UsersView() {
  const params = useParams()
  const userID = params.currentUser
  const firstUser = import.meta.env.VITE_API_FIRST_USER

  const [alertModal, setAlertModal] = useState(false)
  const [editingUser, setEditingUser] = useState<AuthUser>(emptyUser)

  const queryClient = useQueryClient()
  const navigate = useNavigate()


  //Gets the users
  const { data } = useQuery({
    queryKey: ["Users"],
    queryFn: getAllUsers
  })

  //Delete user query
  const deleteUser = useMutation({
    mutationFn: DeleteUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Users"] })
      toast.success(data)
    }
  })

  const handleEditUser = (user: AuthUser) => {
    if(user._id === firstUser && userID !== firstUser) {
      toast.error("Acción no permitida")
      return
    }

    queryClient.removeQueries({ queryKey: ["CurrentFullUser"] })
    navigate(`/users/${userID}/editUser/${user._id}`)
  }

  const handleDeleteUser = () => {
    const {mutate} = deleteUser
    
    mutate(editingUser._id)
    setAlertModal(false)
    setEditingUser(emptyUser)
  }

  if (data) {
    return (
      <div className={styles.container}>
        <h1 className={styles.titulo}>Usuarios</h1>
        <p className={styles.subtitulo}>Maneja y administra los usuarios</p>

        <nav>
          <Link
            className={styles.link_boton}
            to={`/users/${userID}/createUser`}
          >Nuevo Usuario</Link>
        </nav>

        <ul className={styles.list_container}>
          {data.map(user => 
            <UserItem 
              key={user._id} 
              user={user} 
              editUser={() => handleEditUser(user)}
              deleteUser={() => {setAlertModal(true), setEditingUser(user)}}  
            />
          )}
        </ul>
        {alertModal && (
          <AlertModal
            message={editingUser._id === userID ? "No puedes eliminar tu propia cuenta" : editingUser._id === firstUser ? `No se puede eliminar a ${editingUser.name}` : `Seguro que deseas eliminar a ${editingUser.name}`}
            onCancel={() => {setAlertModal(false), setEditingUser(emptyUser)}}
            onConfirm={() => {editingUser._id === firstUser || editingUser._id === userID ? {} : handleDeleteUser()}}
          />
        )}
      </div>
    )
  }
}

