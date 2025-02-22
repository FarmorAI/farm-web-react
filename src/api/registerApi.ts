import axios from "axios";


const API_BASE_URL = "/api"; // 실제 API URL로 변경

// 이메일 중복 확인
export const checkEmail = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/join/email/${email}`
    );
    // 서버가 true를 반환하면 중복(사용 불가), false면 사용 가능하도록 반전
    return !response.data;
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
};

// 닉네임 중복 확인
export const checkNickname = async (nickname: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/join/nickname/${nickname}`
    );
    // 서버가 true를 반환하면 중복, false면 사용 가능하도록 반전
    return response.data;
  } catch (error) {
    console.error("Error checking nickname:", error);
    return false;
  }
};

// 회원가입 요청
export const registerUser = async (userData: {
  email: string;
  password: string;
  nickname: string;
  phone: string;
  address: string;
}): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/join`,
      { user: userData }
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
};
