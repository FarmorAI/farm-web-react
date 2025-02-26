import React, {  useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Lock, User } from "lucide-react";
import { menuData } from "../pagelayout/MenuData";
import Breadcrumbs from "../pagelayout/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserInfoQuery } from "../../api/authApi";
import { RootState } from "../../redux/store";
import { logoutUser, setUser } from "../../redux/slices/authslices";
import { getCookie, removeCookie } from "../../util/cookieUtill";


const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: userData } = useGetUserInfoQuery(undefined, {
    skip: !getCookie("jwt"), // ✅ JWT 토큰이 없으면 실행 안 함
  });
  const user = useSelector((state: RootState)=> state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    if (userData) {
      dispatch(setUser(userData));
    }
  },[userData, dispatch]);

  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);


  // 로그아웃 처리 함수
  const handleLogout = () => {
    dispatch(logoutUser());
    removeCookie("jwt");
    window.location.replace("/");
  };


  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-10">
              <img
                className="h-8 w-auto pr-12"
                src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png"
                alt="스마트팜"
              />
            </div>

            <div className="hidden md:flex space-x-6 text-xl font-bold text-gray-900">
              {menuData.map(({ name, links }) => (
                <div
                  key={name}
                  className="relative group"
                  onMouseEnter={() => setHoveredMenu(name)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <button
                    className="flex items-center space-x-1 px-5 py-2 text-gray-700 hover:text-blue-500"
                    onClick={() => navigate(links[0].to)}
                  >
                    <span>{name}</span>
                  </button>
                  {hoveredMenu === name && (
                    <div className="absolute bg-white shadow-lg rounded-md py-2 w-48 z-50">
                      {links.map(({ to, label }) => (
                        <Link
                          key={to}
                          to={to}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 🔹 로그인 여부에 따른 UI 변경 */}
            <div className="hidden md:flex space-x-4">
              {user ? (
                <div className="flex items-center space-x-6">
                  <span className="text-lg font-semibold text-gray-800">
                    {user.nickname}님
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-lg font-semibold text-red-600 hover:text-red-700"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <AuthLinks />
              )}
            </div>

            {/* 🔹 모바일 메뉴 버튼 */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 모바일 메뉴 (로그인 상태 반영) */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 text-lg font-semibold text-gray-800">
            {menuData.map(({ name, links }) => (
              <div key={name} className="border-b">
                <p className="px-4 py-2 text-gray-700">{name}</p>
                <div className="pl-4">
                  {links.map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            {user ? (
              <div className="text-center py-2">
                <p className="text-lg font-semibold text-gray-800">
                  {user.nickname}님
                </p>
                <button
                  onClick={handleLogout}
                  className="text-red-600 font-semibold hover:text-red-700"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <AuthLinks />
            )}
          </div>
        )}
      </nav>
      <Breadcrumbs />
    </>
  );
};
/* 🔥 로그인하지 않은 경우 보여줄 링크 */
const AuthLinks: React.FC = () => (
  <div className="flex items-center space-x-6">
    <Link
      to="/auth/login"
      className="flex items-center text-gray-700 text-lg font-semibold hover:text-blue-500"
    >
      <Lock className="w-5 h-5 mr-1" /> 로그인
    </Link>
    <Link
      to="/auth/register"
      className="flex items-center text-gray-700 text-lg font-semibold hover:text-blue-500"
    >
      <User className="w-5 h-5 mr-1" /> 회원가입
    </Link>
  </div>
);

export default Header;
