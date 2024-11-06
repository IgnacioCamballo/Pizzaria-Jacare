import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import styles from "@/styles/components/NavMenu.module.css"



export default function NavMenu() {

  return (
    <Popover className={styles.popover}>
      <PopoverButton className={styles.popover_button}>
        <Bars3Icon className={styles.bars3Icon} />
      </PopoverButton>

        <PopoverPanel className={styles.popover_panel}>
          <div className={styles.contenedor_popover}>
            <p className={styles.texto_usuario}>Hola: Usuario</p>
            <Link
              to='/admin/categories'
              className={styles.texto_boton_menu}
            >Categorías</Link>
            <Link
              to="/admin"
              className={styles.texto_boton_menu}
            >Productos</Link>
            <button
              className={styles.texto_boton_menu}
              type='button'
              onClick={() => { }}
            >
              Cerrar Sesión
            </button>
          </div>
        </PopoverPanel>
    </Popover>
  )
}