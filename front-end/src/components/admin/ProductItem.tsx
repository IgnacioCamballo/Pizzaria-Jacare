import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Cloudinary } from '@cloudinary/url-gen';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage, lazyload } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';

import styles from "@/styles/views/AdminView.module.css"
import { Product } from '../../types/types'

type ProductItemProps = {
  product: Product,
  setDeletingItem: React.Dispatch<React.SetStateAction<string>>,
  setAlertModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProductItem({ product, setDeletingItem, setAlertModal }: ProductItemProps) {
  const navigate = useNavigate()

  const cld = new Cloudinary({ cloud: { cloudName: 'diy7juddz' }})

  const img = cld
    .image(product.img)
    .format('auto')
    .quality('auto')
    .resize(fill().width(96).height(96).gravity(autoGravity()))

  return (
    <li key={product._id} className={styles.producto_lista}>
      <div className={styles.leftCont}>
        <div className={styles.foto}>
          <AdvancedImage cldImg={img} plugins={[lazyload()]}/>
        </div>

        <div className={styles.contenedor_info}>
          <Link to={`/admin/products/${product._id}/edit`}
            className={styles.nombre_producto}
          >{product.idNumber !== 0 ? `${product.idNumber}. ` : ""}{product.name}</Link>
          {product.ingredients && <p className={styles.text_info}><span className={styles.span}>Ingredientes: </span>{product.ingredients}</p>}
          {product.category === "673c815cd2ab7e85c67cb972" ? (
            <div className={styles.prices}>
              <p className={styles.price}>Grande: R$ {product.price}</p>
              <p className={styles.price}>Media: R$ {product.price2}</p>
            </div>
          ) :
            <p className={styles.price}>R$ {product.price}</p>
          }
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.button_edit} onClick={() => { navigate(`/admin/products/${product._id}/edit`) }}>Editar</button>
        <button className={styles.button_delete} onClick={() => { setDeletingItem(product._id!), setAlertModal(true) }}>Eliminar</button>
      </div>
    </li>
  )
}
