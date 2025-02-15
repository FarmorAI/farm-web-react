import React, { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { Menu, X, Lock, User } from "lucide-react";
import { menuData } from "../pagelayout/MenuData";
import Breadcrumbs from "../pagelayout/Breadcrumbs";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const navigate = useNavigate();

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
            <div className="hidden md:flex space-x-4">
              <AuthLinks />
            </div>
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
            <AuthLinks />
          </div>
        )}
      </nav>
      <Breadcrumbs />
    </>
  );
};

const AuthLinks: React.FC = () => (
  <div className="flex items-center space-x-6">
    <Link to="/login" className="flex items-center text-gray-700 text-lg font-semibold hover:text-blue-500">
      <Lock className="w-5 h-5 mr-1" /> 로그인
    </Link>
    <Link to="/register" className="flex items-center text-gray-700 text-lg font-semibold hover:text-blue-500">
      <User className="w-5 h-5 mr-1" /> 회원가입
    </Link>
  </div>
);

export default Header;
