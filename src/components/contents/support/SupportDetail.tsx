import React, { useEffect, useState } from 'react'
import PageLayout from '../../pagelayout/PageLayout'
import { Support } from '../../../model/contents';
import useMove from '../../../hook/useMove';
import { getSupportById } from '../../../api/supportApi';

interface SupportDetailProps {
   inquiryId?: number;
}

const SupportDetail: React.FC<SupportDetailProps> = ({ inquiryId }) => {
   const [support, setSupport] = useState<Support | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const { moveToList } = useMove();

   console.log("체크 시점", inquiryId);
   
   useEffect(() => {
      const fetchSupport = async () => {
         if (!inquiryId) return;
         setIsLoading(true);
         try {
            const data = await getSupportById(inquiryId);
            setSupport(data);
         } catch (error) {
            console.error("데이터를 불러오는 중 오류 발생:", error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchSupport();
   }, [inquiryId]);

   if (isLoading) return (
      <div className="text-center py-10 text-gray-500">
         데이터를 불러오는 중...
      </div>
   );

   if (!support) return (
      <div className="text-center py-10 text-gray-500">
         공지사항을 찾을 수 없습니다.
      </div>
   );

   return (
      <PageLayout title="상세 페이지" activeItem="공지사항">
         <div className="max-w-7xl mx-auto p-6 bg-white  rounded-lg ">
            <div className="page_tits mb-4"></div>
            <table className="w-full border-collapse border border-gray-300">
               <tbody>
                  <tr className="border-b">
                     <td className="bg-gray-100 px-4 py-2 font-semibold w-1/5">글 유형</td>
                     <td className="px-4 py-2">공지사항</td>
                     <td className="bg-gray-100 px-4 py-2 font-semibold">등록일</td>
                     <td className="px-4 py-2">{new Date(support.createdAt).toLocaleString()}</td>
                  </tr>
                  <tr className="border-b">
                     <td className="bg-gray-100 px-4 py-2 font-semibold">제목</td>
                     <td className="px-4 py-2" colSpan={3}>{support.title}</td>
                  </tr>
                  <tr className="border-b">
                     <td className="bg-gray-100 px-4 py-2 font-semibold">조회</td>
                     <td className="px-4 py-2" colSpan={3}>{support.views}</td>
                  </tr>
                  <tr className="border-b">
                     <td className="bg-gray-100 px-4 py-2 font-semibold">이름</td>
                     <td className="px-4 py-2" colSpan={3}>{support.writer}</td>
                  </tr>
                  <tr>
                     <td className="bg-gray-100 px-4 py-24 font-semibold align-top">내용</td>
                     <td className="px-4 py-28 min-h-[550px]" colSpan={3}>{support.content}</td>
                  </tr>
               </tbody>
            </table>
            <div className="flex justify-end mt-6 space-x-4">
               <button className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">수정</button>
               <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">삭제</button>
               <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => moveToList()}
               >
                  뒤로
               </button>
            </div>
         </div>
      </PageLayout>
   )
}

export default SupportDetail