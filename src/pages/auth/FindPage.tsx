// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { findEmail } from "../../api/memberApi";

// // 아이디 찾기 폼 타입
// interface FindEmailForm {
//   name: string;
//   phone: string;
// }

// // 비밀번호 재설정 폼 타입
// interface ResetPwdForm {
//   email: string;
//   name: string;
//   phone: string;
//   password: string;
//   repassword: string;
// }



// // API 응답 타입
// interface ApiResponse<T> {
//   result: T[];
//   message?: string;
// }

// const LoginFind: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<"findEmail" | "resetPwd">("findEmail");
//   const [findEmailForm, setFindEmailForm] = useState<FindEmailForm>({
//     name: "",
//     phone: "",
//   });
//   const [foundEmail, setFoundEmail] = useState<string | null>(null);
//   const [resetPwdForm, setResetPwdForm] = useState<ResetPwdForm>({
//     email: "",
//     name: "",
//     phone: "",
//     password: "",
//     repassword: "",
//   });
//   const [resetPwdMessage, setResetPwdMessage] = useState<string | null>(null);

//   // 탭 변경 함수
//   const handleTabChange = (tab: "findEmail" | "resetPwd") => setActiveTab(tab);

//   // 입력값 변경 핸들러
//   const handleInputChange = <T,>(
//     event: React.ChangeEvent<HTMLInputElement>,
//     formSetter: React.Dispatch<React.SetStateAction<T>>
//   ) => {
//     const { name, value } = event.target;
//     formSetter((prev) => ({ ...prev, [name]: value }));
//   };

//   // 아이디 찾기 요청
//   const handleFindEmail = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { name, phone } = findEmailForm;

//     const email = await findEmail(name, phone);
//     setFoundEmail(email);
//   };

//   // 비밀번호 재설정 요청
//   const resetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const { email, name, phone, password, repassword } = resetPwdForm;
//     if (password !== repassword) {
//       alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
//       return;
//     }

//     try {
//       const response = await fetch("/api/api/resetPwd", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, pwd: password, name, phone }),
//       });

//       const result: ApiResponse<null> = await response.json();

//       if (response.ok) {
//         alert(result.message || "비밀번호 재설정에 성공했습니다.");
//         window.location.href = "/login";
//       } else {
//         alert(result.message || "비밀번호 재설정에 실패했습니다.");
//         setResetPwdMessage(result.message || "비밀번호 재설정에 실패했습니다.");
//       }
//     } catch (error) {
//       console.error("비밀번호 재설정 실패:", error);
//       setResetPwdMessage("비밀번호 재설정 중 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <main className="max-w-2xl mx-auto px-4 py-8">
//       <div className="bg-white rounded-lg shadow-xl p-8">
//         <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
//           아이디/비밀번호 찾기
//         </h1>
//         <p className="text-center text-gray-600 mb-8">
//           가입 시 입력한 이메일 확인을 통해
//           <br />
//           아이디 확인 및 비밀번호 재설정을 할 수 있습니다.
//         </p>

//         <div className="flex border-b border-gray-200 mb-8">
//           <button
//             className={`flex-1 py-3 text-center border-b-2 ${
//               activeTab === "findEmail"
//                 ? "border-custom text-custom font-medium"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => handleTabChange("findEmail")}
//           >
//             아이디 찾기
//           </button>
//           <button
//             className={`flex-1 py-3 text-center border-b-2 ${
//               activeTab === "resetPwd"
//                 ? "border-custom text-custom font-medium"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => handleTabChange("resetPwd")}
//           >
//             비밀번호 찾기
//           </button>
//         </div>

//         {activeTab === "findEmail" ? (
//           <form onSubmit={handleFindEmail } className="space-y-6">
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 이름
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 required
//                 className="block w-full border-gray-300 focus:border-custom focus:ring-custom sm:text-sm rounded-lg"
//                 value={findEmailForm.name}
//                 onChange={(e) => handleInputChange(e, setFindEmailForm)}
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="phone"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 전화번호
//               </label>
//               <input
//                 type="text"
//                 id="phone"
//                 name="phone"
//                 required
//                 className="block w-full border-gray-300 focus:border-custom focus:ring-custom sm:text-sm rounded-lg"
//                 value={findEmailForm.phone}
//                 onChange={(e) => handleInputChange(e, setFindEmailForm)}
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-custom text-white py-3 px-4 rounded-lg hover:bg-custom/90"
//             >
//               아이디 찾기
//             </button>
//             {foundEmail && (
//               <p
//               className={`text-center font-medium mt-4 ${
//                 foundEmail === "회원 정보가 없습니다." ? "text-red-500" : "text-green-600"
//               }`}
//             >
//                 찾은 아이디: {foundEmail}
//               </p>
//             )}
//           </form>
//         ) : (
//           <form onSubmit={resetPassword} className="space-y-6">
//             {["email", "name", "phone", "password", "repassword"].map(
//               (field, index) => (
//                 <div key={index}>
//                   <label
//                     htmlFor={field}
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     {field === "email"
//                       ? "이메일"
//                       : field === "name"
//                       ? "이름"
//                       : field === "phone"
//                       ? "전화번호"
//                       : field === "password"
//                       ? "새로운 비밀번호"
//                       : "비밀번호 재입력"}
//                   </label>
//                   <input
//                     type={field.includes("password") ? "password" : "text"}
//                     id={field}
//                     name={field}
//                     required
//                     className="block w-full border-gray-300 focus:border-custom focus:ring-custom sm:text-sm rounded-lg"
//                     value={resetPwdForm[field as keyof ResetPwdForm]}
//                     onChange={(e) => handleInputChange(e, setResetPwdForm)}
//                   />
//                 </div>
//               )
//             )}
//             <button
//               type="submit"
//               className="w-full bg-custom text-white py-3 px-4 rounded-lg hover:bg-custom/90"
//             >
//               비밀번호 재설정
//             </button>
//             {resetPwdMessage && (
//               <p className="text-center text-red-500 mt-4">{resetPwdMessage}</p>
//             )}
//           </form>
//         )}
//               <div className="mt-4 text-center">
//         <Link to="/login" className="text-muted me-3">로그인</Link>
//         <span style={{ color: 'rgb(187, 188, 189)' }}>|</span>
//         <Link to="/register" className="text-muted me-3 ms-3">회원가입</Link>
//         <span style={{ color: 'rgb(187, 188, 189)' }}>|</span>
//         <Link to="/question" className="text-muted me-3 ms-3">고객센터</Link>
//         <span style={{ color: 'rgb(187, 188, 189)' }}>|</span>
//         <Link to="/" className="text-muted ms-3">홈화면</Link>
//       </div>
//       </div>
//     </main>
//   );
// };

// export default LoginFind;



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
