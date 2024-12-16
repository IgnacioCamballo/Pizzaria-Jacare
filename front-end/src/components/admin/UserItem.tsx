import styles from "@/styles/views/UsersView.module.css"

import { AuthUser } from '../../types/usersTypes'
import UserMenu from './UserMenu'

type UserItemProps = {
  user: AuthUser,
  editUser: () => void,
  deleteUser: () => void
}

export default function UserItem({user, editUser, deleteUser}: UserItemProps) {

  return (
    <li className={styles.user_container}>
      <div className={styles.user}>
        <h2 className={styles.user_name}>{user.name}</h2>
        <UserMenu
          onClic1={editUser}
          onClic2={deleteUser}
        />
      </div>
    </li>
  )
}