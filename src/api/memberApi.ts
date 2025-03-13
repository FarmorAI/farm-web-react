import axios from "axios";
import { getCookie } from "../util/cookieUtill";

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

// 이메일 찾기
export const findEmail = async (name: string, phone: string): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/member/auth/find-email`,
      { name, phone }
    );

     // 응답 데이터가 있고, 이메일이 존재하면 반환
     if (response.data.data?.email) {
      return response.data.data.email;
    }
     // 응답이 200이지만 이메일이 없으면 "회원 정보가 없습니다." 반환
    return "회원 정보가 없습니다.";
  } catch (error) {
    console.error("아이디 찾기 요청 실패:", error);

    // 서버가 404 또는 400을 반환한 경우 "회원 정보가 없습니다."로 처리
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 400 || error.response.status === 404) {
        return "회원 정보가 없습니다.";
      }
    }

    // 기타 에러는 일반적인 오류 메시지 반환
    return "아이디 찾기 중 오류가 발생했습니다.";
  }
};

// ✅ 회원정보 수정 API
export const updateUserProfile = async (memberId: number, updateInfo: {
  nickname: string;
  phone: string;
  address: string;
}): Promise<boolean> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/member/auth/${memberId}`, updateInfo, {
      headers: {
        Authorization: `Bearer ${getCookie("jwt")}`,
        "Content-Type": "application/json",
      },
    });

    return response.status === 200; // 성공 여부 반환 (true / false)
  } catch (error) {
    console.error("회원정보 수정 오류:", error);
    return false;
  }
};


// ✅ 회원 삭제 API
export const deleteMember = async (memberId: number): Promise<boolean> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/member/auth/${memberId}`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwt")}`,
      },
    });

    return response.status === 204; // No Content 응답이면 성공
  } catch (error) {
    console.error("회원 탈퇴 오류:", error);
    return false;
  }
};