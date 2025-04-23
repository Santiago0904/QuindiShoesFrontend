import './App.css'
import { RegisterForm } from './Components/RegisterForm/RegisterForm'
import { Routes, Route} from 'react-router-dom' 
import { Register } from './Pages/Register/Register'
import { Login } from './Pages/Login/Login'
import { Home } from './Pages/Home/Home'
import { Header } from './Layouts/Header/Header'
import { EmailPage } from './Pages/EmailPage/EmailPage'
import { PasswordPage } from './Pages/PasswordPage/PasswordPage'

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
      </Routes>
    </>
  )
}

export default App
