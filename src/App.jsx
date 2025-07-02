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
import { ZonaProductoPage } from './Pages/ZonaProductoPage/ZonaProductoPage'
import { RegisterEmpledos } from './Pages/Empleados/Empleadospages'
import {PanelControl} from './Pages/PanelControl/PanelControl'
import { ListaEmpleados } from './Pages/Empleados/Empleados'
import Carrito from './Pages/Carrito/Carrito'
import { ListaMateriales } from './Pages/MostrarMateriales/MostrarMateriales'
import { ListaColores } from './Pages/MostrarColores/MostrarColores'
import { ListaZonas } from './Pages/MostrarZonaProductos/MostrarZonaProductos'
import { Personalizador } from './Pages/Personalizador/Personalizador'


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
import { MaterialPage } from './Pages/MaterialPage/MaterialPage'
import { ColorPage } from './Pages/ColorPage/ColorPage'
import { MetricasPages } from './Pages/MetricasPage/MetricasPages'
import { Favoritos } from './Pages/Favoritos/Favoritos'
import ScrollToTop from './Components/ScrollTop/ScrollTop'
import { Accesibilidad } from './Components/Accesibilidad/Accesibilidad'
import { Nosotros } from './Pages/Nosotros/Nosotros'
import { AnimatePresence } from "framer-motion";
import { PageWrapper } from './Components/PageWrapper/PageWrapper'
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

  // Ocultar solo el footer en el personalizador
  const ocultarSoloFooter =
    location.pathname.toLowerCase() === "/personalizador";

  return (
    <>
      {!ocultarHeader && <Header />}
      <Accesibilidad />

      <div className="relative min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col">
         <ScrollToTop />
            <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/nosotros" element={<PageWrapper><Nosotros /></PageWrapper>} />
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/recuperarcontrasena" element={<PageWrapper><EmailPage /></PageWrapper>} />
          <Route path="/reiniciarcontrasena" element={<PageWrapper><PasswordPage /></PageWrapper>} />
          <Route path="/nuevoProducto" element={<PageWrapper><NewProduct /></PageWrapper>} />
          <Route path="/productos" element={<PageWrapper><ListaProductos /></PageWrapper>} />
          <Route path="/material" element={<PageWrapper><MaterialNewForm /></PageWrapper>} />
          <Route path="/color" element={<PageWrapper><ColorNewForm /></PageWrapper>} />
          <Route path="/zona" element={<PageWrapper><ZonaNewForm /></PageWrapper>} />
          <Route path="/empleados" element={<PageWrapper><RegisterEmpledos /></PageWrapper>} />
          <Route path="/listaempleados" element={<PageWrapper><ListaEmpleados /></PageWrapper>} />
          <Route path="/panelcontrol" element={<PageWrapper><PanelControl /></PageWrapper>} />
          <Route path="/carrito" element={<PageWrapper><Carrito /></PageWrapper>} />
          <Route path="/listamateriales" element={<PageWrapper><ListaMateriales /></PageWrapper>} />
          <Route path="/listacolores" element={<PageWrapper><ListaColores /></PageWrapper>} />
          <Route path="/listazonas" element={<PageWrapper><ListaZonas /></PageWrapper>} />
          <Route path="/respuestapago" element={<PageWrapper><RespuestaPago /></PageWrapper>} />
          <Route path="/rechazada" element={<PageWrapper><Rechazada /></PageWrapper>} />
          <Route path="/confirmacion" element={<PageWrapper><Confirmacion /></PageWrapper>} />
          <Route path="/perfil" element={<PageWrapper><Perfil /></PageWrapper>} />
          <Route path="/validarcorreo" element={<PageWrapper><VerificarCorreo /></PageWrapper>} />
          <Route path="/esperando-confirmacion" element={<PageWrapper><EsperandoConfirmacion /></PageWrapper>} />
          <Route path="/productodetalladopages" element={<PageWrapper><ProductoDetalladoPages /></PageWrapper>} />
          <Route path="/juego" element={<PageWrapper><Juego /></PageWrapper>} />
          <Route path="/producto/:id" element={<PageWrapper><DetalleProducto /></PageWrapper>} />
          <Route path="/producto/:id/variantes" element={<PageWrapper><VariantesProducto /></PageWrapper>} />
          <Route path="/historialfacturas" element={<PageWrapper><HistorialFacturas /></PageWrapper>} />
          <Route path="/metricas" element={<PageWrapper><MetricasPages /></PageWrapper>} />
          <Route path="/favoritos" element={<PageWrapper><Favoritos /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
        </div>
      </div>

      {!ocultarFooter && <Footer />}
    </>
  );
}



export default App;
