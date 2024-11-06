import { Link } from "react-router-dom";
import styles from "@/styles/views/CategoriesView.module.css"
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/CategoryAPI";
import { useState } from "react";

export default function CategoriesView() {
  const [categoryList, setCategoryList] = useState({})

  const {data} = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  })

  if(data) return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Categorías</h1>
      <p className={styles.subtitulo}>Administra las Categorías y Sub-Categorías</p>
      
      <div className={styles.buttons_cont}>
        <Link className={styles.link_boton} to="/admin">Volver a Productos</Link>

        <button className={styles.new_boton}> Nueva Categoría</button>
      </div>

      {data.length ? (
        <ul>
          {data?.map(category => 
            <li className={styles.category_container}>
              <h2 className={styles.category_name}>{category.name}</h2>
            </li>
          )}
        </ul>
      ) : (
        <>aa</>
      )}
    </div>
  )
}
