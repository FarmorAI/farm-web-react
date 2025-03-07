import useFetchLogin from "../../hook/auth/useFetchLogin";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage: React.FC = () => {
  const { loginInfo, setLoginInfo, handleLogin, isLoading } = useFetchLogin();

  return <LoginForm loginInfo={loginInfo} setLoginInfo={setLoginInfo} handleLogin={handleLogin} isLoading={isLoading} />;
};

export default LoginPage;

