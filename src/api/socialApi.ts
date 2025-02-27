import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_SPRING_API_URL}/api`;

const rest_api_key: string = "";
const redirect_uri: string = "";

const auth_code_path = "https://kauth.kakao.com/oauth/authorize"
const access_token_url = "https://kauth.kakao.com/oauth/token";

// 카카오 소셜 로그인 인가코드 받기
export const getKakaoAuthUrl = () => {
    return `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
}


export const getAccessToken = async (code: string) => {
    const header = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};

    const params = {
        grant_type: "authorization_code",
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: code
    }
    try {
        const res = await axios.post(access_token_url, params, header)
        return res.data.access_token
    } catch (error) {
        console.error("Error getting access token:", error);
        return null;
    }
}

export const getMemberWithAccessToken = async (accessToken: string) => {
    const header = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
    };
    try {
        const res = await axios.post(`${API_BASE_URL}/member/social/kakao`,{}, header)
        return res.data
    } catch (error) {
        console.error("Error getting member info:", error);
        return null;
    }
}

// ==================== Naver 관련 ====================
const naverClientId: string = import.meta.env.VITE_NAVER_CLIENT_ID || "PD9OmabK7VUj5UhbkUhM";
const naverRedirectUri: string = import.meta.env.VITE_NAVER_REDIRECT_URI || "http://localhost:3030/auth/naver/callback";

const naverAuthUrl = "https://nid.naver.com/oauth2.0/authorize";

// 네이버 소셜 로그인 인가코드 URL 생성
// state 값은 CSRF 방지를 위해 임의의 문자열을 사용 (실제 환경에서는 동적으로 생성할 것을 권장)
export const getNaverAuthUrl = () => {
    return `${naverAuthUrl}?client_id=${naverClientId}&redirect_uri=${naverRedirectUri}&response_type=code`;
};

// 네이버 엑세스 토큰 요청
export const getNaverAccessToken = async (code: string): Promise<string | null> => {
    try {
        // 백엔드의 토큰 발급 엔드포인트 호출 (예: /api/member/social/naver/token)
        const res = await axios.get(`${import.meta.env.VITE_SPRING_API_URL}/api/member/social/naver/token`, {
            params: { code },
        });
        return res.data.access_token;
    } catch (error) {
        console.error("Error getting Naver access token:", error);
        return null;
    }
};


// 네이버 엑세스 토큰으로 백엔드에서 회원정보 요청
export const getNaverMemberWithAccessToken = async (accessToken: string) => {
    const headers = {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    };
    try {
        const res = await axios.post(`${API_BASE_URL}/member/social/naver`, {}, { headers });
        return res.data;
    } catch (error) {
        console.error("Error getting Naver member info:", error);
        return null;
    }
};
