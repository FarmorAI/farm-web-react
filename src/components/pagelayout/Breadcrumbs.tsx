import { Link, useLocation } from "react-router-dom"
import { menuData } from "./MenuData"

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const matchedMenu = menuData.flatMap(menu =>
    menu.links.map(link => ({ ...link, parent: menu.name }))
  ).find(item => item.to === currentPath);

  return (
    <nav className="bg-gray-20 bg-gray-200">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center space-x-4 py-3 text-sm text-gray-600 ml-20">
          <Link to="/" className="hover:text-custom hover:underline">HOME</Link>
          {matchedMenu && (
            <>
              <span className="text-gray-400">&gt;</span>
              <Link to={matchedMenu.to} className="hover:text-custom hover:underline">
                {matchedMenu.parent}
              </Link>
              <span className="text-gray-400">&gt;</span>
              <span className="text-custom font-medium">{matchedMenu.label}</span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;