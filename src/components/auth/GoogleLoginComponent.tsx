import {Link} from "react-router-dom";
import {getGoogleAuthUrl} from "../../api/socialApi.ts";

const link = getGoogleAuthUrl();


const GoogleLoginComponent = () => {
    return (
        <div className="flex justify-center">
            <Link to = {link}>
                <img
                    src="/public/assets/images/google_login.png"
                    alt="google"
                    className="w-51 h-12 cursor-pointer mb-3"
                />
            </Link>
        </div>
    );
};

export default GoogleLoginComponent;