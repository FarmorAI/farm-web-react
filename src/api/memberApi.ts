import axios from "axios";

export const API_BASE_URL = `${import.meta.env.VITE_SPRING_API_URL}/api`;

// 이메일 중복 확인
export const checkEmail = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/member/join/email/${email}`
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
      `${API_BASE_URL}/member/join/nickname/${nickname}`
    );
    // 서버가 true를 반환하면 중복, false면 사용 가능하도록 반전
    return response.data;
  } catch (error) {
    console.error("Error checking nickname:", error);
    return false;
  }
};

// 회원가입 요청
export const registerUser = async (memberDto: {
  email: string;
  password: string;
  name: string;
  nickname: string;
  phone: string;
  address: string;
  birthDate: string;
}): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/member/join`, memberDto);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
};

//로그인 요청
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      { email, password }, // 요청 바디
      { withCredentials: true } // ✅ 세션 기반 인증 사용 시 필요
    );

    console.log("로그인 응답:", response.data);

    if (response.data.success) {
      return response.data; // 사용자 정보 반환
    } else {
      alert("로그인 실패: " + response.data.message);
      return null;
    }
  } catch (error) {
    console.error("로그인 오류:", error);
    alert("로그인 실패: " + (error || "서버 오류"));
    return null;
  }
};