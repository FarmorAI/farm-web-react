import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getNaverAccessToken, getNaverMemberWithAccessToken } from "../../api/socialApi";

const NaverRedirectPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const code: string | null = searchParams.get('code');

    useEffect(() => {
        if (code) {
            // code 값을 이용해 네이버 access token 요청
            getNaverAccessToken(code).then((accessToken) => {
                if (accessToken) {
                    // 백엔드로 네이버 access token 전달하여 회원 정보 조회 및 신규 회원가입 처리
                    getNaverMemberWithAccessToken(accessToken).then((result) => {
                        console.log("네이버 회원정보:", result);
                        if (result && result.social) {
                            // 성공 시 원하는 페이지로 이동 (예: 홈)
                            navigate("/");
                        } else {
                            console.error("회원 정보 조회 실패 또는 social 플래그가 false입니다.");
                        }
                    });
                } else {
                    console.error("네이버 access token 발급 실패");
                }
            });
        }
    }, [code, navigate]);

    return (
        <div>
            <h2>Naver Login Redirect</h2>
            <p>Code: {code}</p>
            <p>로그인 처리 중입니다...</p>
        </div>
    );
};

export default NaverRedirectPage;
