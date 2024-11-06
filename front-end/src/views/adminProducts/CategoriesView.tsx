import { Link } from "react-router-dom";
import styles from "@/styles/views/CategoriesView.module.css"
import { useQuery } from "@tanstack/react-query";
import { Product } from "../../types/types";

export default function CategoriesView() {

  const {data} = useQuery({
    queryKey: ["categories"],
    //queryFn: getCategories
  })

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Categorías</h1>
      <p className={styles.subtitulo}>Administra las Categorías y Sub-Categorías</p>
      
      <nav>
        <Link
          className={styles.link_boton}
          to="/admin"
        >Volver a Productos</Link>
      </nav>

      
    </div>
  )
}
