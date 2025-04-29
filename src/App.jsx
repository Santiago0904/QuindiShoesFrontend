import './App.css'
import { Routes, Route} from 'react-router-dom' 
import { Register } from './Pages/Register/Register'
import { Login } from './Pages/Login/Login'
import { Home } from './Pages/Home/Home'
import { Header } from './Layouts/Header/Header'
import { EmailPage } from './Pages/EmailPage/EmailPage'
import { PasswordPage } from './Pages/PasswordPage/PasswordPage'
import { NewProduct } from './Pages/NewProduct/NewProduct'
import { ListaProductos } from './Pages/Productos/Productos'
import {MaterialNewForm} from './Components/MaterialNewForm/MaterialNewForm'
import { ColorNewForm } from './Components/ColorNewForm/ColorNewForm'
import { ZonaNewForm } from './Components/ZonaNewForm/ZonaNewFrom'
import { RegisterEmpledos } from './Pages/Empleados/Empleadospages'
import {PanelControl} from './Pages/PanelControl/PanelControl'
function App() {

  return (
    <>
    <Header/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/recuperarContrasena' element={<EmailPage/>}/>
        <Route path='/reiniciarContrasena' element={<PasswordPage/>}/>
        <Route path='/nuevoProducto' element={<NewProduct/>}/>
        <Route path='/productos' element={<ListaProductos/>}/>
        <Route path='/material' element={<MaterialNewForm/>}/>
        <Route path='/color' element={<ColorNewForm/>}/>
        <Route path='/zona' element={<ZonaNewForm/>}/>
        <Route path='/productos' element={<ListaProductos/>}/>
        <Route path='/Empleados' element={<RegisterEmpledos/>}/>
        <Route path='/PanelControl' element={<PanelControl/>}/>
      </Routes>
    </>
  )
}

export default App
