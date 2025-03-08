import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/authApi";
import { getCookie } from "../../util/cookieUtill";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authslices.ts";

interface LoginInfo {
  email: string;
  password: string;
}

// ✅ 로그인 기능을 커스텀 훅으로 분리
const useFetchLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });
  const [login, { isLoading }] = useLoginMutation(); // RTK Query 사용

  // 🔥 로그인 함수
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 방지

    try {
      const userData = await login(loginInfo).unwrap();

      console.log(userData);
      
      const token = getCookie("jwt");

      if (token) {
        alert("로그인 성공!");
        dispatch(setUser(userData.data.user));
        navigate("/");
      }
    } catch (error) {
      console.error("❌ 로그인 실패:", error);
      alert("로그인 실패! 다시 시도하세요.");
    }
  };

  return { loginInfo, setLoginInfo, handleLogin, isLoading };
};

export default useFetchLogin;
