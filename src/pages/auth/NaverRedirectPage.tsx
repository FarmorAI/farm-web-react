import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getNaverAccessToken, getNaverMemberWithAccessToken } from "../../api/socialApi";
import useFetchSocialLogin from "../../hook/auth/useFetchSocialLogin"; // ✅ 새로 만든 훅

const NaverRedirectPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { handleSocialLogin } = useFetchSocialLogin(); // ✅ 커스텀 훅 사용
    const code: string | null = searchParams.get("code");

    useEffect(() => {
        if (code) {
            // 🔹 네이버 access token 요청
            getNaverAccessToken(code).then((accessToken) => {
                if (accessToken) {
                    // 🔹 백엔드로 access token 전달하여 회원 정보 요청
                    getNaverMemberWithAccessToken(accessToken).then((result) => {
                        console.log("네이버 회원정보:", result);

                        if (result && result.social) {
                            // ✅ 로그인 처리 (JWT 저장 + Redux 상태 업데이트)
                            handleSocialLogin(result);  // 소셜 로그인 처리
                        } else {
                            console.error("❌ 회원 정보 조회 실패 또는 social 플래그가 false");
                        }
                    });
                } else {
                    console.error("❌ 네이버 access token 발급 실패");
                }
            });
        }
    }, [code, navigate, handleSocialLogin]);

    return (
        <div>
            <h2>Naver Login Redirect</h2>
            <p>Code: {code}</p>
            <p>로그인 처리 중입니다...</p>
        </div>
    );
};

export default NaverRedirectPage;
