
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FindEmailForm from "../../components/auth/find/FindEmailForm";
import useFindEmail from "../../hook/auth/useFindEmail";

const FindPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"findEmail" | "resetPwd">("findEmail");
  const { findEmailForm, foundEmail, handleInputChange, handleFindEmail } = useFindEmail();

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
          아이디/비밀번호 찾기
        </h1>
        <p className="text-center text-gray-600 mb-8">
          가입 시 입력한 이메일 확인을 통해
          <br />
          아이디 확인 및 비밀번호 재설정을 할 수 있습니다.
        </p>

        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`flex-1 py-3 text-center border-b-2 ${
              activeTab === "findEmail"
                ? "border-custom text-custom font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("findEmail")}
          >
            아이디 찾기
          </button>
          <button
            className={`flex-1 py-3 text-center border-b-2 ${
              activeTab === "resetPwd"
                ? "border-custom text-custom font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("resetPwd")}
          >
            비밀번호 찾기
          </button>
        </div>

        {activeTab === "findEmail" && (
          <FindEmailForm
            findEmailForm={findEmailForm}
            foundEmail={foundEmail}
            handleInputChange={handleInputChange}
            handleFindEmail={handleFindEmail}
          />
        )}

        <div className="mt-4 text-center">
          <Link to="/login" className="text-muted me-3">로그인</Link>
          <span style={{ color: 'rgb(187, 188, 189)' }}>|</span>
          <Link to="/register" className="text-muted me-3 ms-3">회원가입</Link>
          <span style={{ color: 'rgb(187, 188, 189)' }}>|</span>
          <Link to="/question" className="text-muted me-3 ms-3">고객센터</Link>
          <span style={{ color: 'rgb(187, 188, 189)' }}>|</span>
          <Link to="/" className="text-muted ms-3">홈화면</Link>
        </div>
      </div>
    </main>
  );
};

export default FindPage;
