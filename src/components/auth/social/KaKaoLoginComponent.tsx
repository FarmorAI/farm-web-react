import { getKakaoAuthUrl } from "../../../api/socialApi.ts";
import { Link } from "react-router-dom";

const link: string = getKakaoAuthUrl();

const KaKaoLoginComponent = () => {
  return (
    <div className="flex justify-center">
      <Link to={link}>
        <img src="/assets/images/auth/kakao.png" alt="Kakao" />
      </Link>
    </div>
  );
};

export default KaKaoLoginComponent;
