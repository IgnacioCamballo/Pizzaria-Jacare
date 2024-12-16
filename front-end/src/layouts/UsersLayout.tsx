import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loader from '../components/admin/Loader'

export default function UsersLayout() {
  const {data, isError, isLoading} = useAuth()

  if(isLoading) return <Loader />

  if(isError) {
    return <Navigate to={"/login"}/>
  }

  if(data?.rank === 1) {
    return (<Outlet />)
  } else {
    return <Navigate to={"/admin"}/>
  }
}
