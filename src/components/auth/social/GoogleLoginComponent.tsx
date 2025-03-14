import { Link } from "react-router-dom";
import { getGoogleAuthUrl } from "../../../api/socialApi.ts";

const link = getGoogleAuthUrl();

const GoogleLoginComponent = () => {
  return (
    <div className="flex justify-center">
      <Link to={link}>
        <img src="/assets/images/auth/google.png" alt="google" />
      </Link>
    </div>
  );
};

export default GoogleLoginComponent;
