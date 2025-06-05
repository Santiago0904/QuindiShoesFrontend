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
import { ProductoDetalladoPages } from './Pages/ProductoDetalladoPages/ProductoDetalladoPages'
import  Perfil  from './Pages/Perfil/Perfil'
import { useLocation } from 'react-router-dom'
import { Rechazada } from './Pages/RespuestaPagos/Rechazada'
import { RespuestaPago } from './Pages/RespuestaPagos/RespuestaPago'
import { Confirmacion } from './Pages/RespuestaPagos/Confrimacion'
import  VerificarCorreo  from './Layouts/VerificarCorreo/VerificarCorreo'
import EsperandoConfirmacion from './Pages/EsperandoConfirmacion/EsperandoConfirmacion'
import Chat from './Components/ChatBot/ChatBot'
import { Juego } from './Pages/Juego/Juego'
import { DetalleProducto } from './Pages/ProductoDetalle/ProductoDetalle'
import { VariantesProducto } from './Pages/VariantesProducto/VariantesProducto'
import { WavesBackground } from './Components/Particulas2/Particulas2'
import { HistorialFacturas } from './Pages/HistorialVentas/historialventas'
import { Favoritos } from './Pages/Favoritos/Favoritos'

function App() {
  const location = useLocation();

  // Rutas donde se ocultan header y footer
  const ocultarHeaderYFooterEn = ["/panelcontrol"];
  // Expresión regular para /producto/:id/variantes
  const variantesRegex = /^\/producto\/[^/]+\/variantes$/i;

  const ocultarHeaderYFooter =
    ocultarHeaderYFooterEn.includes(location.pathname.toLowerCase()) ||
    variantesRegex.test(location.pathname);

  return (
    <>
      {!ocultarHeaderYFooter && <Header />}
      <div className="relative min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col">
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
            <Route path='/RespuestaPago' element={<RespuestaPago />}/>
         
            <Route path='/ProductoDetalladoPages' element={<ProductoDetalladoPages/>}/>
            <Route path='/HistorialFacturas' element={<HistorialFacturas />}/>
            
            
            <Route path='/Confirmacion' element={<Confirmacion />}/>


            <Route path='/Perfil' element={<Perfil/>}/>

            <Route path="/validarCorreo" element={<VerificarCorreo />}/>
            <Route path="/esperando-confirmacion" element={<EsperandoConfirmacion />} />
            <Route path="/juego" element={<Juego />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/producto/:id/variantes" element={<VariantesProducto />} />

            <Route path="/Favoritos" element={<Favoritos/>} />


          </Routes>
        </div>
       
      </div>
      {!ocultarHeaderYFooter && <Footer />}

    </>
  );
}

export default App
