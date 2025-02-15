import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


const Header = lazy(() => import("./components/section/Header"))
const Login = lazy(() => import("./pages/login/Login"))
const Register = lazy(() => import("./pages/register/Register"))
const Footer = lazy(() => import("./components/section/Footer"))
const BoardList = lazy(() => import("./pages/board/BoardList"))
const BoardNotice = lazy(() => import("./pages/board/BoardNotice"));
const Chart = lazy(() => import("./pages/chart/Chart"));
const LoginFind = lazy(() => import("./pages/login/LoginFind"));
const Practice = lazy(() => import("./pages/practice/Practice"));
const Pract = lazy(() => import("./pages/practice/Pract"));
const Prac = lazy(() => import("./pages/practice/Prac"));
const Team = lazy(() => import("./pages/introduce/Team"));
const Project = lazy(() => import("./pages/introduce/Project"));
const UploadList = lazy(() => import("./pages/upload/UploadList"));
const UploadForm = lazy(() => import("./pages/upload/UploadForm"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/board/list" element={<BoardList />} />
        <Route path="/board/notice" element={<BoardNotice />} />
        <Route path="/introduce/team" element={<Team />} />
        <Route path="/introduce/Project" element={<Project />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/login/find" element={<LoginFind />} />
        <Route path="/upload/form" element={<UploadForm />} />
        <Route path="/upload/list" element={<UploadList />} />
        <Route path="/practice" element={<Practice />}/>
        <Route path="/pract" element={<Pract />}/>
        <Route path="/prac" element={<Prac />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
