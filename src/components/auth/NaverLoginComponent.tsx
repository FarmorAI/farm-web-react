import { getNaverAuthUrl } from "../../api/socialApi.ts";
import { Link } from "react-router-dom";

const link: string = getNaverAuthUrl();

const NaverLoginComponent = () => {
    return (
        <div className="flex justify-center">
            <Link to={link}>
                <img
                    src="/assets/images/naver_login.png"
                    alt="Naver"
                />
            </Link>
        </div>
    );
};

export default NaverLoginComponent;
