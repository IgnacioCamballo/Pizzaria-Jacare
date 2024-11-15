import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ReactSortable } from "react-sortablejs";

import styles from "@/styles/views/CategoriesView.module.css"
import { getCategories } from "../../api/CategoryAPI";
import { Category } from "../../types/categoriesTypes";
import ArrowSVG from "../../components/svg/ArrowSVG";
import CategoryMenu from "../../components/admin/CategoryMenu";

export default function CategoriesView() {
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [showedCat, setShowedCat] = useState<string>("")
  const [subCatShownList, setSubCatShownList] = useState()

  const {data, isLoading, isSuccess} = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  })

  useEffect (() => {
    if(data) {setCategoryList(data)}
  }, [isSuccess])

  const SubCatShowed = (cat: Category) => {
    if(cat.name === showedCat) {
      setShowedCat("")
      setSubCatShownList(undefined)
    } else {
      setShowedCat(cat.name)
      //setSubCatShownList(cat.subCateg)
    }
  }

  console.log(showedCat)
  console.log(subCatShownList)
  console.log(categoryList)


  if(isLoading) return "Cargando..."

  if(data) return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Categorías</h1>
      <p className={styles.subtitulo}>Administra las Categorías y Sub-Categorías</p>
      
      <div className={styles.buttons_cont}>
        <Link className={styles.link_boton} to="/admin">Volver a Productos</Link>

        <button className={styles.new_boton}> Nueva Categoría</button>
      </div>

      {categoryList.length ? (
        <ReactSortable 
          tag="ul" 
          className={styles.list_container} 
          list={categoryList} 
          setList={setCategoryList}
          dragClass="sortableDrag"
          animation={200}
          easing="ease-out"
        >
          {categoryList.map(category => 
            <li key={category._id} className={styles.category_container}>
              <div className={styles.category}>
                <div className={styles.cat_name_side}>
                  <ArrowSVG className={styles.arrow} onClick={() => SubCatShowed(category)}/>

                  <h2 className={styles.category_name}>{category.name}</h2>
                </div>
                <CategoryMenu />
              </div>

              {/* {showedCat === category.name && 
                <ReactSortable 
                  tag="ul" 
                  className={styles.list_container} 
                  list={subCatShownList} 
                  setList={setSubCatShownList}
                  dragClass="sortableDrag"
                  animation={200}
                  easing="ease-out"
                  >
                  {subCatShownList!.map(sub =>
                    <li key={sub.nameSub}>
                      <h2>{sub.nameSub}</h2>
                    </li>
                  )}
                </ReactSortable>
              } */}
            </li>
          )}
        </ReactSortable>
      ) : (
        <>No hay categorías aún</>
      )}
    </div>
  )
}
