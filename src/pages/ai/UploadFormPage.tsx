import { useState } from "react";
import axios from "axios";
import PageLayout from "../../components/pagelayout/PageLayout";
import FileUploader from "../../components/ai/uploadform/FileUploader";
import ProcessingSteps from "../../components/ai/uploadform/Step";
import RatingSection from "../../components/ai/uploadform/RatingSection";
import { API_BASE_URL } from "../../api/memberApi"

interface QualityMetrics { 
  [key: string]: number 
}

// interface ApiResponse {
//   image: string;
//   quality: QualityMetrics;
//   error?: string;
// }

const AIUploadPage: React.FC = () => {
  // 상태 관리
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [qualityMetrics, setQualityMetrics] = useState<QualityMetrics>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 파일 업로드 Handle
  const handleUpload = async (files: File[]) => {
    // 파일 검증
    if (!files.length) {
      setError("업로드 파일이 없습니다.")
      return;
    } else {
      setIsLoading(true)  // 업로드 진행 중이면 true 설정
      setError(null)
    }

    // formData에 이미지 Append
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    // 서버에 요청
    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData,
        { headers: {"Content-Type": "multipart/form-data"} }
      );

      if (response.data) {
        setProcessedImage(response.data.image_url);
        setQualityMetrics(response.data.quality_metrics.quality || {});
      } else if (response.data.error) {
        setError(response.data.error);
      }
    } catch (error) {
      console.error("파일 업로드 오류:", error);
      setError("업로드 중 오류 발생, 다시 시도해주세요!")
    } finally {
      setIsLoading(false);  // 업로드 종료되면 true 설정
    }
  };

  // AI 분석 결과 보기 함수 추가
  const handleViewResults = () => {
    console.log("분석 결과 페이지로 이동!");
    // 여기서 분석 결과 페이지로 이동하는 로직을 추가하면 됨 (예: React Router 사용)
  };

  return (
    <PageLayout title="이미지 업로드" activeItem="이미지 업로드">
      <div className="flex flex-col items-center text-center w-full">
        <FileUploader onUpload={handleUpload} onViewResults={handleViewResults} isLoading={isLoading}/>
        {/* 에러 발생 시, 활성화 */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* 정상 작동 시, 활성화 */}
        {processedImage && (
          <>
            <img src={processedImage} alt="AI 분석 결과" className="mt-6 mb-6 border rounded" />
            <div className="grid grid-cols-3 gap-3 mb-6">
              {Object.entries(qualityMetrics).map(([key, value]) => (
                <div key={key} className="flex justify-between bg-gray-200 p-2 rounded-md">
                  <span className="text-gray-700 font-medium">{key}:</span>
                  <span className="text-red-600 font-medium">{value*100}%</span>
                </div>
              ))}
            </div>
            <ProcessingSteps />
            <RatingSection />
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default AIUploadPage;
