import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


const Header = lazy(() => import("./components/section/Header"))
const Login = lazy(() => import("./pages/login/Login"))
const Register = lazy(() => import("./pages/register/Register"))
const Footer = lazy(() => import("./components/section/Footer"))
const BoardList = lazy(() => import("./pages/board/BoardList"))
const Introduce = lazy(() => import("./pages/introduce/Introduce"))
const Chart = lazy(() => import("./pages/chart/Chart"));
const Find = lazy(() => import("./pages/find/Find"));
const Practice = lazy(() => import("./pages/practice/Practice"));
const Pract = lazy(() => import("./pages/practice/Pract"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/board/list" element={<BoardList />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/login/find" element={<Find />} />
        <Route path="/practice" element={<Practice />}/>
        <Route path="/pract" element={<Pract />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
