import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authslices.ts";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../util/cookieUtill";

// 소셜 로그인 후 처리하는 커스텀 훅
const useFetchSocialLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 소셜 로그인 후 처리 함수
    const handleSocialLogin = (userData: any) => {
        try {
            const { accessToken, email, nickname } = userData;

            // JWT를 쿠키에 저장
            if (accessToken) {
                setCookie("jwt", accessToken, 7);
            } else {
                console.warn("JWT 토큰이 없습니다.");
            }

            // Redux 상태 업데이트
            dispatch(setUser({ email, nickname }));

            // 로그인 성공 후 홈으로 이동
            alert("소셜 로그인 성공!");
            navigate("/");

        } catch (error) {
            console.error("소셜 로그인 처리 중 오류 발생:", error);
            alert("소셜 로그인 실패! 다시 시도하세요.");
        }
    };

    return { handleSocialLogin };
};

export default useFetchSocialLogin;
