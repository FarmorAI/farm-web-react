import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation(); // 현재 경로 가져오기
  const pathnames = location.pathname.split("/").filter((x) => x); // 경로 분리

  return (
    <nav>
      <ul className="breadcrumb">
        <li>
          <Link to="/">HOME</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <li key={index}>
              <Link to={routeTo}>{name.replace("-", " ")}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
