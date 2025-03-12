import { Link } from "react-router-dom";
import "/public/assets/css/login/Login.css";
import GoogleLoginComponent from "./social/GoogleLoginComponent.tsx";
import NaverLoginComponent from "./social/NaverLoginComponent.tsx";
import KaKaoLoginComponent from "./social/KaKaoLoginComponent.tsx";

// ✅ `props`로 필요한 데이터 및 함수 전달
interface LoginFormProps {
  loginInfo: { email: string; password: string };
  setLoginInfo: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >;
  handleLogin: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  loginInfo,
  setLoginInfo,
  handleLogin,
  isLoading,
}) => {
  return (
    <div className="d-flex min-vh-100 justify-content-center align-items-center">
      <div>
        {/* 로고 */}
        <div className="text-center mb-2">
          <img
            src={"/assets/images/logo/applepick.png"}
            alt="로고"
            className="mb-3 ml-3"
            style={{ height: "100px" }}
          />
        </div>

        {/* 로그인 폼 */}
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

          <div className="mb-3 position-relative">
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

          {/* 아이디/비밀번호 찾기 */}
          <div className="text-center mt-3 mb-3">
            <Link
              to="/auth/login/find"
              className="text-decoration-none text-secondary"
            >
              아이디/비밀번호 찾기
            </Link>
          </div>

          {/* SNS 로그인 */}
          <div className="d-flex align-items-center my-4">
            <div className="flex-grow-1 border-top border-secondary"></div>
            <div className="mx-3 text-secondary fw-bold">SNS LOGIN</div>
            <div className="flex-grow-1 border-top border-secondary"></div>
          </div>

          <div className="d-flex justify-content-center gap-3 mt-3">
            <GoogleLoginComponent />
            <NaverLoginComponent />
            <KaKaoLoginComponent />
          </div>
        </form>

        {/* 회원가입 링크 */}
        <div className="text-center mt-4">
          <p className="text-secondary">아직 회원이 아니신가요?</p>
          <Link
            to="/auth/register"
            className="text-decoration-none text-success fw-bold"
          >
            회원가입하기
          </Link>
        </div>

        {/* 푸터 */}
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

export default LoginForm;
