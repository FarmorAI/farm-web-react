import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Lock, User } from 'lucide-react'; // 아이콘 추가


const menuData = [
  {
    name: '소개',
    links: [
      { to: '/monitoring', label: '모니터링' },
      { to: '/control', label: '제어 시스템' },
    ],
  },
  {
    name: 'AI',
    links: [
      { to: '/analytics', label: '데이터 분석' },
      { to: '/mypage', label: '고객지원' },
    ],
  },
  {
    name: '개별페이지',
    links: [
      { to: '/board/list', label: '알림소식' },
      { to: '/introduce', label: '팀소개' },
    ],
  },
  {
    name: '알림소식',
    links: [
      { to: '/pract', label: '연습' },
      { to: '/practice', label: '연습2' },
    ],
  },
  {
    name: '고객지원',
    links: [
      { to: '/pract', label: '연습' },
      { to: '/practice', label: '연습2' },
      { to: '/prac', label: '연습3' },
    ],
  },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <>
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
                    onClick={() => navigate(links[0].to)} // 🟢 첫 번째 링크로 이동
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

      <Breadcrumbs />
    </>
  );
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((x) => x);

  // 부모 메뉴 찾기 함수 (현재 경로에 해당하는 부모 메뉴 찾기)
  const getBreadcrumbData = (path: string) => {
    for (const menu of menuData) {
      const found = menu.links.find((link) => link.to === `/${path}`);
      if (found) {
        return { name: found.label, parent: menu.name, parentPath: menu.links[0].to };
      }
    }
    return { name: path, parent: '', parentPath: '' };
  };

  // 첫 번째 경로에서 부모 메뉴 찾아오기
  const firstPath = pathNames.length > 0 ? `/${pathNames[0]}` : '/';
  const parentMenu = menuData.find((menu) => menu.links.some((link) => link.to.startsWith(firstPath)));

  return (
    <nav className="bg-gray-20">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center space-x-4 py-3 text-sm text-gray-600">
          <Link to="/" className="hover:text-custom hover:underline">
            HOME
          </Link>
          {parentMenu && (
            <>
              <span className="text-gray-400">&gt;</span>
              <Link to={parentMenu.links[0].to} className="hover:text-custom hover:underline">
                {parentMenu.name}
              </Link>
            </>
          )}
          {pathNames.map((path, index) => {
            const { name } = getBreadcrumbData(path);
            const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathNames.length - 1;

            return (
              <span key={path} className="flex items-center space-x-2">
                <span className="text-gray-400">&gt;</span>
                {!isLast ? (
                  <Link to={routeTo} className="hover:text-custom hover:underline">
                    {name}
                  </Link>
                ) : (
                  <span className="text-custom font-medium">{name}</span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

// 로그인 / 회원가입 버튼
const AuthLinks: React.FC = () => (
  <div className="flex items-center space-x-6">
    <Link to="/login" className="flex items-center text-gray-700 text-lg font-semibold hover:text-blue-500">
      <Lock className="w-5 h-5 mr-1" />
      로그인
    </Link>
    <Link to="/register" className="flex items-center text-gray-700 text-lg font-semibold hover:text-blue-500">
      <User className="w-5 h-5 mr-1" />
      회원가입
    </Link>
  </div>
);

export default Header;
