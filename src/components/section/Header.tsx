import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Menu, X } from "lucide-react";
import { menuData } from "../pagelayout/MenuData";
import Breadcrumbs from "../pagelayout/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserInfoQuery } from "../../api/authApi";
import { RootState } from "../../redux/store";
import { logoutUser, setUser } from "../../redux/slices/authslices";
import { getCookie, removeCookie } from "../../util/cookieUtill";
import { FaShoppingCart } from "react-icons/fa";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: userData } = useGetUserInfoQuery(undefined, {
    skip: !getCookie("jwt"),
  });

  const user = useSelector((state: RootState) => state.auth.user);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [userData, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    removeCookie("jwt");
    navigate("/");
  };

  // 변경: 메뉴 항목 클릭 시 모바일 메뉴 닫기
  const handleMenuItemClick = (to: string) => {
    navigate(to);
    setIsMobileMenuOpen(false); // 메뉴 클릭 시 닫기
  };

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="max-w-8xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="flex items-center h-16">
            {/* 로고 (왼쪽 고정) */}
            {/* 변경: 로고 크기 조정 및 잘림 방지 */}
            <div className="flex-shrink-0 px-5">
              <Link to="/">
                <img
                  className="h-11 w-auto max-w-[150px] object-contain"
                  src="/assets/images/logo/applepick.png"
                  alt="Berrypick"
                />
              </Link>
            </div>

            {/* 변경: 메뉴를 가운데 정렬, flex-1과 justify-center로 조정 */}
            <div className="flex-1 flex justify-center">
              {/* 변경: lg 미만에서 숨기기 */}
              <div className="hidden lg:flex items-center space-x-4 text-xl font-bold text-gray-900">
                {menuData.map(({ name, links }) => (
                  <div
                    key={name}
                    className="relative group flex-shrink-0"
                    onMouseEnter={() => setHoveredMenu(name)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    <button
                      className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-blue-500 whitespace-nowrap"
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
            </div>

            {/* 로그인/프로필 섹션 (오른쪽 고정) */}
            {/* 변경: lg 미만에서 숨기기 */}
            <div className="hidden lg:flex items-center space-x-4 pr-5">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/product/cart"
                    className="relative text-gray-700 hover:text-red-500 flex-shrink-0"
                  >
                    <FaShoppingCart size={28} />
                  </Link>
                  <div
                    className="relative group flex-shrink-0"
                    onMouseEnter={() => setHoveredMenu("profile")}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    <button className="flex items-center space-x-1 text-gray-800 text-lg font-semibold whitespace-nowrap">
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
                </div>
              ) : (
                <AuthLinks />
              )}
            </div>

            {/* 변경: 햄버거 메뉴 버튼, lg 미만에서 표시 */}
            <div className="lg:hidden flex items-center pr-5">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-blue-500 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* 변경: 모바일 메뉴 표시, lg 미만에서만 표시 */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white shadow-lg">
              <div className="flex flex-col space-y-2 px-5 py-4">
                {menuData.map(({ name, links }) => (
                  <div key={name} className="relative">
                    <button
                      className="w-full text-left text-gray-700 hover:text-blue-500 py-2"
                      onClick={() => handleMenuItemClick(links[0].to)} // 변경: 클릭 시 메뉴 닫기
                    >
                      {name}
                    </button>
                    <div className="pl-4">
                      {links.map(({ to, label }) => (
                        <Link
                          key={to}
                          to={to}
                          className="block py-1 text-sm text-gray-600 hover:text-blue-500"
                          onClick={() => handleMenuItemClick(to)} // 변경: 클릭 시 메뉴 닫기
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/product/cart"
                      className="text-gray-700 hover:text-red-500 py-2"
                      onClick={() => handleMenuItemClick("/product/cart")} // 변경: 클릭 시 메뉴 닫기
                    >
                      장바구니
                    </Link>
                    <Link
                      to="auth/profile"
                      className="text-gray-700 hover:text-blue-500 py-2"
                      onClick={() => handleMenuItemClick("auth/profile")} // 변경: 클릭 시 메뉴 닫기
                    >
                      마이페이지
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false); // 변경: 로그아웃 시 메뉴 닫기
                      }}
                      className="text-left text-red-600 hover:text-red-800 py-2"
                    >
                      로그아웃
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/auth/login"
                      className="flex items-center text-gray-700 hover:text-blue-500 py-2"
                      onClick={() => handleMenuItemClick("/auth/login")} // 변경: 클릭 시 메뉴 닫기
                    >
                      <Lock className="w-5 h-5 mr-2" /> 로그인
                    </Link>
                    <Link
                      to="/auth/register"
                      className="flex items-center text-gray-700 hover:text-blue-500 py-2"
                      onClick={() => handleMenuItemClick("/auth/register")} // 변경: 클릭 시 메뉴 닫기
                    >
                      <User className="w-5 h-5 mr-2" /> 회원가입
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      <Breadcrumbs />
    </>
  );
};

/* 🔥 로그인하지 않은 경우 보여줄 링크 */
const AuthLinks: React.FC = () => (
  <div className="flex items-center space-x-4">
    <Link
      to="/auth/login"
      className="flex items-center text-gray-700 text-lg font-semibold hover:text-blue-500 whitespace-nowrap flex-shrink-0"
    >
      <Lock className="w-5 h-5 mr-1" /> 로그인
    </Link>
    <Link
      to="/auth/register"
      className="flex items-center text-gray-700 text-lg font-semibold hover:text-blue-500 whitespace-nowrap flex-shrink-0"
    >
      <User className="w-5 h-5 mr-1" /> 회원가입
    </Link>
  </div>
);

export default Header;