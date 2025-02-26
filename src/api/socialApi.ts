import axios from "axios";
import { API_BASE_URL } from "./memberApi";

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
