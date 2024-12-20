import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../../api/ProductAPI"
import EditProductForm from "../../components/admin/EditProductForm"
import Loader from "../../components/admin/Loader"

export default function EditProductView() {
  const params = useParams()
  const productId = params.productId!
  
  const {data, isLoading, isError} = useQuery({
    queryKey: ["editProduct", productId],
    queryFn: () => getProductById(productId),
    retry: false
  })

  if(isLoading) return <Loader />
  
  if(isError) return <Navigate to="/404"/>

  if(data) return <EditProductForm data={data} productId={productId}/>
}
