import axios from "axios";
import { API_BASE_URL } from "./memberApi";

const redirect_uri_kakao = "http://localhost:3030/auth/kakao/callback";
const auth_code_path = "https://kauth.kakao.com/oauth/authorize"
const access_token_url = "https://kauth.kakao.com/oauth/token";

// 카카오 소셜 로그인 인가코드 받기
export const getKakaoAuthUrl = () => {
    return `${auth_code_path}?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${redirect_uri_kakao}&response_type=code`;
}

// 카카오 소셜 로그인 인가코드로 엑세스 토큰 받기
export const getKakaoAccessToken = async (code: string) => {
    const header = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};

    const params = {
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
        redirect_uri: redirect_uri_kakao,
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

// 카카오 소셜 로그인 엑세스 토큰으로 사용자 정보 받기
export const getKakaoWithAccessToken = async (accessToken: string) => {
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

//======================================[구글 로그인]====================================================

const google_auth_code_path = "https://accounts.google.com/o/oauth2/v2/auth";
const redirect_uri_google = "http://localhost:3030/auth/google/callback";
const access_token_url_google = "https://oauth2.googleapis.com/token";

// 구글 소셜 로그인 인가코드 받기
export const getGoogleAuthUrl = () => {
    return `${google_auth_code_path}?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${redirect_uri_google}&response_type=code&scope=email%20profile`;
}

// 구글 소셜 로그인 인가코드로 엑세스 토큰 받기
export const getGoogleAccessToken = async (code: string) => {
    const header = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}};

    const params = {
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        redirect_uri: redirect_uri_google,
        code: code
    }
    try {
        const res = await axios.post(access_token_url_google, params, header)
        return res.data.access_token
    } catch (error) {
        console.error("Error getting access token:", error);
        return null;
    }
}

// 구글 소셜 로그인 엑세스 토큰으로 사용자 정보 받기
export const getGoogleWithAccessToken = async (accessToken: string) => {
    const header = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
    };
    try {
        const res = await axios.post(`${API_BASE_URL}/member/social/google`,{}, header)
        return res.data
    } catch (error) {
        console.error("Error getting member info:", error);
        return null;
    }
}