import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
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
    skip: !getCookie("jwt"), // ✅ JWT 토큰 없으면 API 호출 안 함
  });

  const user = useSelector((state: RootState) => state.auth.user);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null); // 🔥 드롭다운 상태

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [userData, dispatch]);

  // ✅ 로그아웃 처리
  const handleLogout = () => {
    dispatch(logoutUser());
    removeCookie("jwt");
    navigate("/");
  };
  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="max-w-8xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="flex justify-between mx-5 h-16 items-center">
            {/* 로고 */}
            <div className="flex items-center  px-5">
              <Link to ="/">
              <img
                className="h-14 w-auto  "
                src="/assets/images/logo/headerlogo.png"
                alt="Berrypick"
              />
              </Link>
            </div>

            {/* 네비게이션 메뉴 */}
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

            {/* 🔹 프로필 드롭다운 */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div
                  className="relative group "
                  onMouseEnter={() => setHoveredMenu("profile")}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <button className="flex items-center space-x-1 text-gray-800 text-lg font-semibold">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <img
                        className="w-8 h-8 rounded-full object-cover m-5"
                        src={
                          user?.imageUrl || "https://via.placeholder.com/100"
                        }
                        alt="프로필"
                      />
                    </div>
                    <span>{user.nickname}님</span>
                  </button>

                  {/* 드롭다운 메뉴 */}
                  {hoveredMenu === "profile" && (
                    <div className="absolute right-0 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                      <Link
                        to="auth/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        마이페이지
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <AuthLinks />
              )}
            </div>
          </div>
        </div>
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
