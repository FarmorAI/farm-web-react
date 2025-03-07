import Register from "../../components/auth/register/RegisterForm"; // RegisterForm.tsx에서 내보낸 Register 컴포넌트 임포트

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="w-full max-w-4xl p-4">
        <Register /> {/* RegisterForm 컴포넌트 사용 */}
      </div>
    </div>
  );
};

export default RegisterPage;
