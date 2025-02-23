import {getKakaoAuthUrl} from "../../api/socialApi.ts";
import {Link} from "react-router-dom";


const link : string  = getKakaoAuthUrl();


const KaKaoLoginComponent = () => {
    return (
        <div className="flex justify-center">
            <Link to = {link}
            >
                <img
                    src="/public/assets/images/kakao_login.png"
                    alt="Kakao"
                />
            </Link>
        </div>
    );
};

export default KaKaoLoginComponent;