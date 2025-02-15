import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const menuData = [
  {
    name: '메뉴1',
    links: [
      { to: '/monitoring', label: '모니터링' },
      { to: '/control', label: '제어 시스템' },
    ],
  },
  {
    name: '메뉴2',
    links: [
      { to: '/analytics', label: '데이터 분석' },
      { to: '/mypage', label: '고객지원' },
    ],
  },
  {
    name: '메뉴3',
    links: [
      { to: '/board/list', label: '알림소식' },
      { to: '/introduce', label: '팀소개' },
    ],
  },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <img
              className="h-8 w-auto"
              src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png"
              alt="스마트팜"
            />
          </div>
          <div className="hidden md:flex space-x-6 text-lg font-semibold text-gray-800">
            {menuData.map(({ name, links }) => (
              <div
                key={name}
                className="relative group"
                onMouseEnter={() => setHoveredMenu(name)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-blue-500">
                  <span>{name}</span>
                  <ChevronDown size={16} />
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
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
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
  );
};

const AuthLinks: React.FC = () => (
  <div className="flex flex-col md:flex-row md:space-x-4">
    <Link to="/login" className="bg-custom px-4 py-2 text-white text-lg font-semibold hover:bg-custom/90 rounded-md text-center">
      로그인
    </Link>
    <Link to="/register" className="border border-custom text-custom px-4 py-2 text-lg font-semibold hover:bg-custom/10 rounded-md text-center">
      회원가입
    </Link>
  </div>
);

export default Header;
