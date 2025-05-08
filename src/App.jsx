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
import { ListaEmpleados } from './Pages/Empleados/Empleados'
import Carrito from './Pages/Carrito/Carrito'
import { ListaMateriales } from './Pages/MostrarMateriales/MostrarMateriales'
import { ListaColores } from './Pages/MostrarColores/MostrarColores'
import { ListaZonas } from './Pages/MostrarZonaProductos/MostrarZonaProductos'
import { Footer } from './Layouts/Footer/Footer'
import  Perfil  from './Pages/Perfil/Perfil'
import { useLocation } from 'react-router-dom'
import  VerificarCorreo  from './Layouts/VerificarCorreo/VerificarCorreo'
import EsperandoConfirmacion from './Pages/EsperandoConfirmacion/EsperandoConfirmacion'
function App() {
  const location = useLocation();

  const ocultarHeaderYFooterEn = [ "/panelcontrol"];

  const mostrarHeaderYFooter = !ocultarHeaderYFooterEn.includes(location.pathname.toLowerCase());
  return (
    <>
    {mostrarHeaderYFooter && <Header/>}

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
        <Route path='/ListaEmpleados' element={<ListaEmpleados/>}/>
        <Route path='/PanelControl' element={<PanelControl/>}/>
        <Route path='/carrito' element={<Carrito/>}/>
        <Route path='/ListaMateriales' element={<ListaMateriales/>}/>
        <Route path='/ListaColores' element={<ListaColores/>}/>
        <Route path='/ListaZonas' element={<ListaZonas/>}/>
        <Route path='/Perfil' element={<Perfil/>}/>
        <Route path="/validarCorreo" element={<VerificarCorreo />}/>
        <Route path="/esperando-confirmacion" element={<EsperandoConfirmacion />} />
        

      </Routes>

      {mostrarHeaderYFooter && <Footer/>}

    </>
  )
}

export default App
