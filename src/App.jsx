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
import { MetricasPages } from './Pages/MetricasPage/MetricasPages'
import { Favoritos } from './Pages/Favoritos/Favoritos'
import ScrollToTop from './Components/ScrollTop/ScrollTop'
import { Accesibilidad } from './Components/Accesibilidad/Accesibilidad'
function App() {
  const location = useLocation();
  const rutaActual = location.pathname.toLowerCase();

  // Rutas donde se oculta SOLO el footer
  const ocultarSoloFooterEn = [
    "/perfil",
    "/login",
    "/register",
    "/recuperarcontrasena",
    "/reiniciarcontrasena",
    "/esperando-confirmacion",
    "/validarcorreo"
  ];

  // Rutas donde se oculta TODO (header + footer)
  const ocultarHeaderYFooterEn = ["/panelcontrol"];
  const variantesRegex = /^\/producto\/[^/]+\/variantes$/i;

  const ocultarHeader =
    ocultarHeaderYFooterEn.includes(rutaActual) || variantesRegex.test(rutaActual);

  const ocultarFooter =
    ocultarHeader || ocultarSoloFooterEn.includes(rutaActual);

  return (
    <>
      {!ocultarHeader && <Header />}
      <Accesibilidad />

      <div className="relative min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col">
         <ScrollToTop />
          <Routes>
            {/* rutas */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recuperarcontrasena" element={<EmailPage />} />
            <Route path="/reiniciarcontrasena" element={<PasswordPage />} />
            <Route path="/nuevoProducto" element={<NewProduct />} />
            <Route path="/productos" element={<ListaProductos />} />
            <Route path="/material" element={<MaterialNewForm />} />
            <Route path="/color" element={<ColorNewForm />} />
            <Route path="/zona" element={<ZonaNewForm />} />
            <Route path="/empleados" element={<RegisterEmpledos />} />
            <Route path="/listaempleados" element={<ListaEmpleados />} />
            <Route path="/panelcontrol" element={<PanelControl />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/listamateriales" element={<ListaMateriales />} />
            <Route path="/listacolores" element={<ListaColores />} />
            <Route path="/listazonas" element={<ListaZonas />} />
            <Route path="/respuestapago" element={<RespuestaPago />} />
            <Route path="/metricas" element={<MetricasPages />} />
            <Route path="/productodetalladopages" element={<ProductoDetalladoPages />} />
            <Route path="/historialfacturas" element={<HistorialFacturas />} />
            <Route path="/confirmacion" element={<Confirmacion />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/validarcorreo" element={<VerificarCorreo />} />
            <Route path="/esperando-confirmacion" element={<EsperandoConfirmacion />} />
            <Route path="/juego" element={<Juego />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/producto/:id/variantes" element={<VariantesProducto />} />
            <Route path="/favoritos" element={<Favoritos />} />
          </Routes>
        </div>
      </div>

      {!ocultarFooter && <Footer />}
    </>
  );
}



export default App;
