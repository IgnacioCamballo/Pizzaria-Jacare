import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'

import styles from "@/styles/components/NavMenu.module.css"

type SubCategoryMenuProps = {
  onClic1: () => void,
  onClic2: () => void,
}

export default function SubCategoryMenu({onClic1, onClic2} : SubCategoryMenuProps) {
  return (
    <Menu>
      <div className={styles.popover}>
        <MenuButton className={styles.menu_button}>
          <Bars3Icon className={styles.bars3IconBlack} />
        </MenuButton>

        <MenuItems className={styles.popover_panel_menu}>
          <div className={styles.contenedor_menu}>

            <MenuItem>
              <button
                className={styles.texto_boton_menu}
                type='button'
                onClick={onClic1}
              >
                Editar Sub Categoría
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className={styles.texto_boton_menu}
                type='button'
                onClick={onClic2}
              >
                Eliminar Sub Categoría
              </button>
            </MenuItem>
            
          </div>
        </MenuItems>
      </div>
    </Menu>
  )
}