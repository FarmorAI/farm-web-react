
import KaKaoLoginComponent from "../../components/auth/KaKaoLoginComponent.tsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/authApi";
import { useDispatch } from "react-redux";
import "/public/assets/css/login/Login.css";
import { setUser } from "../../redux/slices/authslices";
import { getCookie } from "../../util/cookieUtill";

// ✅ 로그인 정보 타입 정의
interface LoginInfo {
  email: string;
  password: string;
}

// ✅ 사용자 정보 타입 정의
interface UserData {
  email: string;
  nickname: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });
  const [login, { isLoading }] = useLoginMutation(); // ✅ useLoginMutation의 타입 자동 추론됨

  // 🔥 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 방지

    try {
      const userData: UserData = (await login(loginInfo).unwrap()) as UserData; // ✅ unwrap() 사용하여 오류 처리 가능

      console.log("🔍 로그인 응답 데이터:", userData); // 응답 확인

      if (userData) {
        alert("로그인 성공!");

        // ✅ Redux Store에 로그인된 유저 정보 저장 (타입 명시)
        dispatch(
          setUser({ email: userData.email, nickname: userData.nickname })
        );

        console.log("======================================");
        console.log(getCookie("jwt"));

        // ✅ 홈 페이지로 이동
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패! 다시 시도하세요.");
    }
  };

  return (
    <div className="d-flex min-vh-100 justify-content-center align-items-center">
      <div>
        <div className="text-center mb-4">
          <img
            src={"https://ai-public.creatie.ai/gen_page/logo_placeholder.png"}
            alt="로고"
            className="mb-3"
            style={{ height: "100px" }}
          />
          <h1 className="h4 fw-bold">에코라이프에 오신 것을 환영합니다</h1>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3 position-relative">
            <label htmlFor="loginEmail" className="form-label">
              이메일
            </label>
            <input
              type="email"
              id="loginEmail"
              className="form-control py-2 ps-4"
              placeholder="✉ 이메일을 입력하세요"
              required
              value={loginInfo.email}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, email: e.target.value })
              }
            />
          </div>

          <div className="mb-3 position-relative ">
            <label htmlFor="loginPwd" className="form-label">
              비밀번호
            </label>
            <input
              type="password"
              id="loginPwd"
              className="form-control py-2 ps-4"
              placeholder="🔒︎ 비밀번호를 입력하세요"
              required
              value={loginInfo.password}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 custom-btn py-2"
            disabled={isLoading}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>

          <div className="text-center mt-3 mb-3">
            <Link
              to="/auth/login/find"
              className="text-decoration-none text-secondary"
            >
              아이디/비밀번호 찾기
            </Link>
          </div>

          <div className="d-flex justify-content-between">
            <a
              href="/api/api/signup/google?server=react"
              style={{ width: "100%" }}
            >
              <button
                type="button"
                className="mt-1 btn w-100"
                style={{
                  border: "1px solid rgb(207, 207, 207)",
                  background: "none",
                }}
              >
                <img
                  src="src/assets/login/google.webp"
                  alt="Google"
                  style={{ maxHeight: "25px", objectFit: "cover" }}
                />{" "}
                Sign up with Google
              </button>
            </a>
          </div>

          <div className="d-flex justify-content-between">
            <a
              href="/api/api/auth/naver?server=react"
              style={{ width: "100%" }}
            >
              <button
                type="button"
                className="mt-3 btn w-100"
                style={{
                  border: "1px solid rgb(207, 207, 207)",
                  background: "none",
                }}
              >
                <img
                  src="src/assets/login/naverLogo.png"
                  alt="네이버 로그인"
                  style={{ maxHeight: "25px", objectFit: "cover" }}
                />{" "}
                Sign up with Naver
              </button>
            </a>
          </div>
          <KaKaoLoginComponent/>
        </form>

        <div className="text-center mt-4">
          <p className="text-secondary">아직 회원이 아니신가요?</p>
          <Link
            to="/auth/register"
            className="text-decoration-none text-success fw-bold"
          >
            회원가입하기
          </Link>
        </div>

        <div className="text-center mt-4 text-secondary small">
          <div>
            <Link to="#" className="text-decoration-none text-secondary me-2">
              이용약관
            </Link>
            <Link to="#" className="text-decoration-none text-secondary ms-2">
              개인정보처리방침
            </Link>
          </div>
          <p className="mt-2 mb-0">© 2024 에코라이프. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
