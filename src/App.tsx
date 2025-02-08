import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


const Header = lazy(() => import("./components/section/Header"))
const Login = lazy(() => import("./pages/login/Login"))
const Register = lazy(() => import("./pages/register/Register"))
const Footer = lazy(() => import("./components/section/Footer"))

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
