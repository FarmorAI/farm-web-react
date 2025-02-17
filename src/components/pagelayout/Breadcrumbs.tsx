import { Link, useLocation } from "react-router-dom";
import { menuData } from "./MenuData";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const matchedMenu = menuData
    .flatMap((menu) =>
      menu.links.map((link) => ({ ...link, parent: menu.name }))
    )
    .find((item) => item.to === currentPath);

  const authPaths: Record<string, { label: string; parent?: string }> = {
    "/auth/login": { label: "로그인" },
    "/auth/register": { label: "회원가입", parent: "로그인" },
    "/auth/login/find": { label: "ID/PW찾기", parent: "로그인" },
  };
  const authBreadcrumb = authPaths[currentPath];

  return (
    <nav className="bg-gray-20 bg-gray-200">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center space-x-4 py-3 text-sm text-gray-600 ml-20">
          <Link to="/" className="hover:text-custom hover:underline">
            HOME
          </Link>
          {matchedMenu && (
            <>
              <span className="text-gray-400">&gt;</span>
              <Link
                to={matchedMenu.to}
                className="hover:text-custom hover:underline"
              >
                {matchedMenu.parent}
              </Link>
              <span className="text-gray-400">&gt;</span>
              <span className="text-custom font-medium">
                {matchedMenu.label}
              </span>
            </>
          )}
          {/* 로그인 및 회원가입 및 ID/PW찾기 경로인 경우 */}
          {authBreadcrumb && (
            <>
              {authBreadcrumb.parent && (
                <>
                  <span className="text-gray-400">&gt;</span>
                  <Link
                    to="/auth/login"
                    className="hover:text-custom hover:underline"
                  >
                    로그인
                  </Link>
                </>
              )}
              <span className="text-gray-400">&gt;</span>
              <span className="text-custom font-medium">{authBreadcrumb.label}</span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
