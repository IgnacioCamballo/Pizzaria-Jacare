import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./views/App";
import AdminLayout from "./layouts/AdminLayout";
import AdminView from "./views/AdminView";
import CreateProductView from "./views/adminProducts/CreateProductView";
import EditProductView from "./views/adminProducts/EditProductView";
import CategoriesView from "./views/adminProducts/CategoriesView";
import LoginLayout from "./layouts/LoginLayout";
import LoginView from "./views/LoginView";
import UsersLayout from "./layouts/UsersLayout";
import UsersView from "./views/adminProducts/UsersView";
import CreateUser from "./views/adminProducts/CreateUser";
import EditUser from "./views/adminProducts/EditUser";

export default function Router() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} index/>
        
        <Route element={<AdminLayout/>}>
          <Route path="/admin" element={<AdminView/>} index/>
          <Route path="/admin/products/create" element={<CreateProductView/>}/>
          <Route path="/admin/products/:productId/edit" element={<EditProductView/>}/>
          <Route path="/admin/categories" element={<CategoriesView/>}/>
          <Route element={<UsersLayout/>}>
            <Route path="/users/:currentUser" element={<UsersView/>} index/>
            <Route path="/users/:currentUser/createUser" element={<CreateUser/>}/>
            <Route path="/users/:currentUser/editUser/:editingUser" element={<EditUser/>}/>
          </Route>
        </Route>

        <Route element={<LoginLayout/>}>
          <Route path="/login" element={<LoginView/>} index/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}