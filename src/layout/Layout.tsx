import { Outlet } from "react-router-dom";
import Header from "../components/section/Header";
import Footer from "../components/section/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* ✅ 여기에 서브 라우트들이 들어감 */}
      <Footer />
    </>
  );
};

export default Layout;