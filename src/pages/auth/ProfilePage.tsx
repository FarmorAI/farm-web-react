// import { useEffect, useRef, useState } from 'react';
// import Chart from 'chart.js/auto';
// import { authApi, useGetUserInfoQuery } from "../../api/authApi"; // ✅ 서버에서 데이터 가져오기
// import axios from "axios";
// import { getCookie } from "../../util/cookieUtill.ts";
// import { API_BASE_URL, checkNickname, updateUserProfile } from "../../api/memberApi.ts";
// import { useDispatch } from 'react-redux';

// const ProfilePage = () => {
//   const chartRef = useRef<HTMLCanvasElement | null>(null);
//   const dispatch = useDispatch();

//   // ✅ 서버에서 유저 정보 가져오기
//   const { data: userInfo, isLoading, error, refetch  } = useGetUserInfoQuery();

//   // ✅ 상태 (초기값을 서버 데이터로 설정)
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [nickname, setNickname] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);
//   const [isNicknameChecked, setIsNicknameChecked] = useState(false); // ✅ 중복 확인 버튼 클릭 여부

//   // ✅ 서버에서 가져온 데이터를 상태에 반영
//   useEffect(() => {
//     //console.log("🔍 서버에서 가져온 사용자 정보:", userInfo); // ✅ 콘솔 확인
//     if (userInfo) {
//       setProfileImage(userInfo.imageUrl || null);
//       setNickname(userInfo.nickname || "");
//       setPhone(userInfo.phone || "");
//       setAddress(userInfo.address || "");
//     }
//   }, [userInfo]);

//   // ✅ ProfilePage가 렌더링될 때, 이전 캐시를 무효화하고 새로운 데이터 요청
//   useEffect(() => {
//     dispatch(authApi.util.invalidateTags([{ type: "User" }])); // ✅ 올바른 태그 타입 적용
//     refetch(); // ✅ 새 데이터 요청
//   }, [dispatch, refetch]);

//   useEffect(() => {
//     if (chartRef.current) {
//       const ctx = chartRef.current.getContext('2d');
//       if (ctx) {
//         new Chart(ctx, {
//           type: 'bar',
//           data: {
//             labels: ['총 분석건수', '이번 달 분석', '평균 정확도'],
//             datasets: [{
//               label: '분석 통계',
//               data: [315, 37, 98],
//               backgroundColor: [
//                 'rgba(99, 102, 241, 0.6)',
//                 'rgba(79, 70, 229, 0.6)',
//                 'rgba(59, 130, 246, 0.6)'
//               ],
//               borderColor: [
//                 'rgba(99, 102, 241, 1)',
//                 'rgba(79, 70, 229, 1)',
//                 'rgba(59, 130, 246, 1)'
//               ],
//               borderWidth: 1
//             }]
//           },
//           options: {
//             scales: {
//               y: {
//                 beginAtZero: true
//               }
//             }
//           }
//         });
//       }
//     }
//   }, []);

//   const handleProfileImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("profileImage", file);

//     try {
//       const response = await axios.put(`${API_BASE_URL}/member/auth/upload-profile`, formData, {
//         headers: {
//           "Authorization": `Bearer ${getCookie("jwt")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 200) {
//         console.log(response.data)
//         const { imageUrl } = response.data;
//         console.log("Uploaded Image URL:", imageUrl);
//         setProfileImage(imageUrl);  // ✅ 상태 업데이트
//         refetch(); // ✅ 프로필 이미지 변경 후 데이터 새로 요청
//       } else {
//         console.error("Image upload failed:", response);
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//     }
//   };

//   // ✅ 닉네임 중복 확인 함수 (버튼 클릭 시 실행)
//   const handleCheckNickname = async () => {
//     if (!nickname.trim()) {
//       alert("닉네임을 입력해주세요.");
//       return;
//     }

//     const isDuplicate = await checkNickname(nickname);
//     setIsNicknameAvailable(!isDuplicate); // ✅ 중복이 아니면 true
//     setIsNicknameChecked(true); // ✅ 중복 확인 버튼을 눌렀음을 표시
//   };

//   // ✅ 회원정보 수정 함수 (닉네임 확인 후에만 가능)
//   const handleUpdateProfile = async () => {
//     if (!userInfo || !isNicknameChecked) {
//       alert("닉네임 중복 확인을 먼저 해주세요.");
//       return;
//     }

//     if (isNicknameAvailable === false) {
//       alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.");
//       return;
//     }

//     const success = await updateUserProfile(userInfo.memberId, {
//       nickname,
//       phone,
//       address,
//     });

//     if (success) {
//       alert("회원정보가 성공적으로 수정되었습니다.");
//       setIsEditModalOpen(false);
//       dispatch(authApi.util.invalidateTags([{ type: "User" }]));
//       refetch();
//     } else {
//       alert("회원정보 수정에 실패했습니다.");
//     }
//   };

//   // ✅ 로딩 상태 처리
//   if (isLoading) return <p>로딩 중...</p>;
//   if (error) return <p>사용자 정보를 가져오는 중 오류가 발생했습니다.</p>;

//   return (
//     <main className="bg-gray-50 font-['Noto_Sans_KR'] max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
//       <div className="px-4 py-6 sm:px-0">
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {/* 기본 정보 카드 */}
//           <div className="col-span-2 bg-white rounded-lg shadow-lg p-6 flex items-center relative">
//             <button
//               className="absolute top-6 right-7 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition"
//               onClick={() => setIsEditModalOpen(true)}
//             >
//               회원정보 수정
//             </button>
//             <div className="flex flex-col items-center w-1/3">
//               <img
//                 src={profileImage || "https://via.placeholder.com/100"}
//                 alt="프로필 사진"
//                 className="w-32 h-32 rounded-full object-cover mb-2"
//               />
//               <label className="text-blue-600 hover:text-blue-800 mt-1 cursor-pointer">
//                 <i className="fas fa-camera mr-1"></i> 프로필 등록
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleProfileImageChange}
//                 />
//               </label>
//             </div>
//             <div className="w-2/3 pl-6 border-l border-gray-300">
//               <h2 className="text-lg font-medium mb-4">기본 정보</h2>
//               <div className="space-y-4">
//                 <div className="flex items-center">
//                   <span className="w-24 text-gray-600">아이디:</span>
//                   <span className="font-medium">{userInfo?.email || "알 수 없음"}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="w-24 text-gray-600">닉네임:</span>
//                   <span className="font-medium">{userInfo?.nickname || "알 수 없음"}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="w-24 text-gray-600">가입일:</span>
//                   <span className="font-medium">{userInfo?.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : "알 수 없음"}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="w-24 text-gray-600">주소:</span>
//                   <span className="font-medium">{userInfo?.address || "알 수 없음"}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 구독 정보 카드 */}
//           <div className="bg-white rounded-lg shadow-lg p-6 card-hover">
//             <h2 className="text-lg font-medium mb-4">구독 정보</h2>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">구독 등급</span>
//                 <span className="text-lg font-medium text-green-600">프리미엄</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">구독 시작일</span>
//                 <span className="text-lg font-medium">2024-01-01</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">남은 일수</span>
//                 <span className="text-lg font-medium text-green-600">25일</span>
//               </div>
//               <div className="flex justify-end">
//                 <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">구독 관리</button>
//               </div>
//             </div>
//           </div>

//           {/* 분석 통계 카드 */}
//           <div className="bg-white rounded-lg shadow-lg p-6 card-hover">
//             <h2 className="text-lg font-medium mb-4">분석 통계</h2>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">총 분석건수</span>
//                 <span className="text-lg font-medium">315</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">이번 달 분석</span>
//                 <span className="text-lg font-medium">37</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">평균 정확도</span>
//                 <span className="text-lg font-medium">98%</span>
//               </div>
//             </div>
//             <canvas id="analysisChart" ref={chartRef} className="mt-4"></canvas>
//           </div>

//           {/* 내 게시글 카드 */}
//           <div className="bg-white rounded-lg shadow-lg p-6 card-hover">
//             <h2 className="text-lg font-medium mb-4">내 게시글</h2>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span>딸기 재배 팁 공유합니다</span>
//                 <span className="text-sm text-gray-500">2024-01-15</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span>수확 시기 질문드립니다</span>
//                 <span className="text-sm text-gray-500">2024-01-10</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span>병해충 관련 문의</span>
//                 <span className="text-sm text-gray-500">2024-01-05</span>
//               </div>
//             </div>
//           </div>

//           {/* 문의 내역 카드 */}
//           <div className="bg-white rounded-lg shadow-lg p-6 card-hover">
//             <h2 className="text-lg font-medium mb-4">문의 내역</h2>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span>생육환경 설정 문의</span>
//                 <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">답변완료</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span>시스템 오류 문의</span>
//                 <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">검토중</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span>분석 결과 관련 문의</span>
//                 <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">대기중</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* 최근 분석 기록 */}
//         <div className="mt-6">
//           <div className="bg-white rounded-lg shadow-lg">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-lg font-medium">최근 분석 기록</h2>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이미지명</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">분석결과</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   <tr>
//                     <td className="px-6 py-4 whitespace-nowrap">2024-01-20</td>
//                     <td className="px-6 py-4">딸기_001.jpg</td>
//                     <td className="px-6 py-4">생육상태 양호</td>
//                     <td className="px-6 py-4">
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">정상</span>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="px-6 py-4 whitespace-nowrap">2024-01-19</td>
//                     <td className="px-6 py-4">딸기_002.jpg</td>
//                     <td className="px-6 py-4">수확 시기 임박</td>
//                     <td className="px-6 py-4">
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">주의</span>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* 분석 이미지 갤러리 */}
//         <div className="mt-6">
//           <div className="bg-white rounded-lg shadow-lg">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-lg font-medium">분석 이미지 갤러리</h2>
//             </div>
//             <div className="p-6">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div className="relative group">
//                   <img src="https://creatie.ai/ai/api/search-image?query=A close-up photograph of fresh, ripe strawberries on a clean white background, showing their vibrant red color and natural texture. The lighting is bright and even, creating a professional product photography look&width=300&height=300&orientation=squarish&flag=780c45ea-9413-4f31-a4b0-91863be8c636&flag=38772b6c-9705-4b2a-acb4-6bbf96280196" className="rounded-lg w-full h-48 object-cover" alt="딸기 이미지" />
//                   <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
//                     <p className="text-sm">생육상태: 양호</p>
//                     <p className="text-xs">2024-01-20</p>
//                   </div>
//                 </div>
//                 <div className="relative group">
//                   <img src="https://creatie.ai/ai/api/search-image?query=A detailed shot of strawberry plants with developing fruit, showing both ripe and unripe berries on the vine against a clean white background. The focus is on the plant's growth stages&width=300&height=300&orientation=squarish&flag=8eaf9e9c-e371-4604-9aa9-481ae8a6a496&flag=906d3960-5238-419b-8472-8e83cf9421db" className="rounded-lg w-full h-48 object-cover" alt="딸기 이미지" />
//                   <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
//                     <p className="text-sm">생육상태: 양호</p>
//                     <p className="text-xs">2024-01-19</p>
//                   </div>
//                 </div>
//                 <div className="relative group">
//                   <img src="https://creatie.ai/ai/api/search-image?query=Close-up of strawberry leaves and flowers in various stages of development, captured against a clean white background. The image shows the plant's health and growth progression&width=300&height=300&orientation=squarish&flag=38954059-5ca9-49c6-8514-de4d46ec73ab&flag=21f5eb5f-9da5-4095-ad6a-2fe28571080d" className="rounded-lg w-full h-48 object-cover" alt="딸기 이미지" />
//                   <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
//                     <p className="text-sm">생육상태: 주의</p>
//                     <p className="text-xs">2024-01-18</p>
//                   </div>
//                 </div>
//                 <div className="relative group">
//                   <img src="https://creatie.ai/ai/api/search-image?query=A professional photograph of multiple strawberries at different ripeness stages, arranged on a clean white background. The image clearly shows the color progression from green to red&width=300&height=300&orientation=squarish&flag=c8afd2f8-71b6-4a94-9fbb-36b35e9ef317&flag=8a5150d7-513c-4d44-96de-019ce83433b8" className="rounded-lg w-full h-48 object-cover" alt="딸기 이미지" />
//                   <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
//                     <p className="text-sm">생육상태: 양호</p>
//                     <p className="text-xs">2024-01-17</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//         {/* 회원정보 수정 모달 */}
//       {isEditModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-lg font-medium mb-4">회원정보 수정</h2>

//             {/* 닉네임 입력 및 중복 확인 버튼 */}
//             <div className="mb-4">
//               <label className="block text-gray-700">닉네임</label>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="text"
//                   value={nickname}
//                   onChange={(e) => {
//                     setNickname(e.target.value);
//                     setIsNicknameChecked(false); // 닉네임이 변경될 경우 다시 확인해야 함
//                   }}
//                   className="flex-1 p-2 border rounded-lg h-10"
//                 />
//                 <button
//                   onClick={handleCheckNickname}
//                   className="w-24 px-2 py-2 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm whitespace-nowrap"
//                 >
//                   중복 확인
//                 </button>
//               </div>
//               {isNicknameAvailable === false && (
//                 <p className="text-red-500 text-sm mt-1">이미 사용 중인 닉네임입니다.</p>
//               )}
//               {isNicknameAvailable === true && isNicknameChecked && (
//                 <p className="text-green-500 text-sm mt-1">사용 가능한 닉네임입니다.</p>
//               )}
//             </div>

//             {/* 휴대폰 번호 */}
//             <div className="mb-4">
//               <label className="block text-gray-700">휴대폰 번호</label>
//               <input
//                 type="text"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>

//             {/* 주소 */}
//             <div className="mb-4">
//               <label className="block text-gray-700">주소</label>
//               <input
//                 type="text"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>

//             {/* 버튼 */}
//             <div className="flex justify-end">
//               <button onClick={() => setIsEditModalOpen(false)} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
//                 취소
//               </button>
//               <button
//                 onClick={handleUpdateProfile}
//                 disabled={!isNicknameChecked || isNicknameAvailable === false} // ✅ 닉네임 중복 확인 후 가능
//                 className={`px-4 py-2 rounded-lg text-white ${
//                   isNicknameChecked && isNicknameAvailable ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 저장
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default ProfilePage;

import SubscriptionCard from "../../components/auth/profile/SubscriptionCard";
import AnalysisChart from "../../components/auth/profile/AnalysisChart";
import ProfileCard from "../../components/auth/profile/ProfileCard";
import ProfileEditModal from "../../components/auth/profile/ProfileEditModal";
import { useProfile } from "../../hook/auth/useProfile";
import { useState } from "react";
import MyBoards from "../../components/auth/profile/MyBoard";
import InquiryHistory from "../../components/auth/profile/InquiryHistory";
import AnalysisGallery from "../../components/auth/profile/AnalysisGallery";
import RecentAnalysisRecords from '../../components/auth/profile/RecentAnalysisRecords.tsx.tsx';

const ProfilePage = () => {
  const {
    profileImage,
    userInfo, // ✅ 추가
    nickname,
    phone,
    address,
    isNicknameAvailable,
    isNicknameChecked,
    handleCheckNickname,
    handleUpdateProfile,
    isLoading,
    error,
    refetch,
  } = useProfile();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isLoading) return <p className="text-center text-gray-600">로딩 중...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        사용자 정보를 가져오는 중 오류가 발생했습니다.
      </p>
    );

  return (
    <main className="bg-gray-50 max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 프로필 카드 */}
          <ProfileCard
            profileImage={profileImage}
            userInfo={userInfo} // ✅ 추가
            openEditModal={() => setIsEditModalOpen(true)}
          />

          {/* 구독 정보 */}
          <SubscriptionCard />

          {/* 분석 통계 */}
          <AnalysisChart />

          {/* 내 게시글 */}
          <MyBoards />

          {/* 문의 내역 */}
          <InquiryHistory />

          {/* ✅ 최근 분석 기록을 전체 너비로 배치 */}
          <div className="col-span-full">
            <RecentAnalysisRecords />
          </div>

          {/* ✅ 분석 이미지 갤러리도 전체 너비로 배치 */}
          <div className="col-span-full">
            <AnalysisGallery />
          </div>
        </div>
      </div>

      {/* 회원정보 수정 모달 */}
      {isEditModalOpen && (
    <ProfileEditModal
    isOpen={isEditModalOpen} // ✅ 대소문자 일치
    onClose={() => setIsEditModalOpen(false)} // ✅ closeModal → onClose 변경
    userInfo={{   // ✅ userInfo 객체로 전달
      memberId: userInfo?.memberId || 0, // ✅ userInfo가 없을 경우 대비하여 기본값 0 설정
      nickname,
      phone,
      address,
    }}
    isNicknameChecked={isNicknameChecked}  // ✅ 변수명 일치
    isNicknameAvailable={isNicknameAvailable ?? false}  // ✅ null 방지 (기본값 false)
    handleCheckNickname={handleCheckNickname}  // ✅ 함수 전달
    handleUpdateProfile={handleUpdateProfile}  // ✅ 함수 전달
    onProfileUpdate={refetch}  // ✅ 추가됨! (유저 정보 갱신) 
  />
)}

    </main>
  );
};

export default ProfilePage;
