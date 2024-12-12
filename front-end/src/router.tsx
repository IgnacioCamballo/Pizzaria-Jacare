import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./views/App";
import AdminLayout from "./layouts/AdminLayout";
import AdminView from "./views/AdminView";
import CreateProductView from "./views/adminProducts/CreateProductView";
import EditProductView from "./views/adminProducts/EditProductView";
import CategoriesView from "./views/adminProducts/CategoriesView";
import LoginLayout from "./layouts/LoginLayout";
import LoginView from "./views/LoginView";

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
        </Route>

        <Route element={<LoginLayout/>}>
          <Route path="/login" element={<LoginView/>} index/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}