import KaKaoLoginComponent from "../../components/auth/KaKaoLoginComponent.tsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/authApi";
import "/public/assets/css/login/Login.css";
import { getCookie } from "../../util/cookieUtill";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authslices.ts";
import GoogleLoginComponent from "../../components/auth/GoogleLoginComponent.tsx";
import NaverLoginComponent from "../../components/auth/NaverLoginComponent.tsx";

// ✅ 로그인 정보 타입 정의
interface LoginInfo {
  email: string;
  password: string;
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
      const userData = await login(loginInfo).unwrap();
      const token = getCookie("jwt");
      console.log("🔑 JWT 쿠키:", token);
      console.log("✅ 로그인 응답 데이터:", userData);

      if (token) {
        alert("로그인 성공!");
        dispatch(setUser(userData));
        navigate("/");
      }
    } catch (error) {
      console.error("❌ 로그인 실패:", error);
      alert("로그인 실패! 다시 시도하세요.");
    }
  };

  return (
    <div className="d-flex min-vh-100 justify-content-center align-items-center">
      <div>
        <div className="text-center mb-2">
          <img
            src={"/public/assets/images/logo/headerlogo.png"}
            alt="로고"
            className="mb-3 ml-3"
            style={{ height: "100px" }}
          />
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
            className="w-100 py-2"
            style={{
              backgroundColor: "#4CAF50",
              borderColor: "#4CAF50",
              color: "white",
            }}
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
          {/* SNS 로그인 구분선 */}
          <div className="d-flex align-items-center my-4">
            <div className="flex-grow-1 border-top border-secondary"></div>
            <div className="mx-3 text-secondary fw-bold">SNS LOGIN</div>
            <div className="flex-grow-1 border-top border-secondary"></div>
          </div>
          {/* SNS 로그인 아이콘 가로 정렬 */}
          <div className="d-flex justify-content-center gap-3 mt-3">
            <GoogleLoginComponent />
            <NaverLoginComponent />
            <KaKaoLoginComponent />
          </div>
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
          <p className="mt-2 mb-0">© 2025 FarmorAI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
