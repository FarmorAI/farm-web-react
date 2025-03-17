import { useState } from "react";
import axios from "axios";
import PageLayout from "../../components/pagelayout/PageLayout";
import FileUploader from "../../components/ai/uploadform/FileUploader";
import ProcessingSteps from "../../components/ai/uploadform/Step";
import { API_BASE_URL } from "../../api/memberApi";
import { getCookie } from "../../util/cookieUtill";

interface QualityMetrics {
  [key: string]: number;
}

const AIUploadPage: React.FC = () => {
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [qualityMetrics, setQualityMetrics] = useState<QualityMetrics>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpload = async (files: File[], fileName: string) => {
    if (!files.length) {
      alert("업로드 파일이 없습니다.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("fileName", fileName); // 파일 이름 추가

    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("jwt")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.image_url) {
        setProcessedImage(response.data.image_url);
        setQualityMetrics(response.data.quality || {});
      } else if (response.data.error) {
        alert(response.data.error);
        throw new Error(response.data.error); // 에러를 throw하여 catch로 이동
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.error === "Unauthorized"
            ? "로그인이 필요합니다."
            : "구독 전용 서비스 입니다.";
        alert(errorMessage);
      } else {
        alert("업로드 중 오류 발생");
      }
      throw error; // 에러를 상위로 전달하여 결과 화면이 표시되지 않게 함
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewResults = () => {
    console.log("분석 결과 페이지로 이동!");
    // 분석 결과 페이지로 이동하는 로직 추가 (예: React Router)
  };

  return (
    <PageLayout title="이미지 업로드" activeItem="이미지 업로드">
      <div className="flex flex-col items-center text-center w-full">
        <FileUploader
          onUpload={handleUpload}
          onViewResults={handleViewResults}
          isLoading={isLoading}
        />
        {processedImage && (
          <>
            <img src={processedImage} alt="AI 분석 결과" className="mt-6 mb-6 border rounded" />
            <div className="grid grid-cols-3 gap-3 mb-6">
              {Object.entries(qualityMetrics).map(([key, value]) => (
                <div key={key} className="flex justify-between bg-gray-200 p-2 rounded-md">
                  <span className="text-gray-700 font-medium">{key}:</span>
                  <span className="text-red-600 font-medium">{value * 100}%</span>
                </div>
              ))}
            </div>
          </>
        )}
        <ProcessingSteps />
      </div>
    </PageLayout>
  );
};

export default AIUploadPage;