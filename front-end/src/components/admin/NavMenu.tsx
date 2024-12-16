import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Link, useNavigate } from 'react-router-dom'
import styles from "@/styles/components/NavMenu.module.css"
import { AuthUser } from '../../types/usersTypes'
import { useQueryClient } from '@tanstack/react-query'

type NavMenuProps = {
  user: AuthUser
}

export default function NavMenu({user}: NavMenuProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const logOut = () => {
    sessionStorage.removeItem("AUTH_TOKEN")
    queryClient.removeQueries({queryKey: ["user"]})
    navigate("/login")
  }

  return (
    <Menu>
      <div className={styles.popover}>
        <MenuButton className={styles.popover_button}>
          <Bars3Icon className={styles.bars3Icon} />
        </MenuButton>

        <MenuItems className={styles.popover_panel}>
          <div className={styles.contenedor_popover}>
            <p className={styles.texto_usuario}>Hola: {user.name}</p>

            {user.rank === 1 && <MenuItem>
              <Link
                to={`/users/${user._id}`}
                className={styles.texto_boton_menu}
              >Usuarios
              </Link>
            </MenuItem>}

            <MenuItem>
              <Link
                to='/admin/categories'
                className={styles.texto_boton_menu}
              >Categorías
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                to="/admin"
                className={styles.texto_boton_menu}
              >Productos
              </Link>
            </MenuItem>
            
            <MenuItem>
              <button
                className={styles.texto_boton_menu}
                type='button'
                onClick={() => logOut()}
              >
                Cerrar Sesión
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </div>
    </Menu>
  )
}