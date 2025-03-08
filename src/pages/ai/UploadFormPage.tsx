import { useState } from "react";
import axios from "axios";
import PageLayout from "../../components/pagelayout/PageLayout";
import FileUploader from "../../components/ai/uploadform/FileUploader";
import ProcessingSteps from "../../components/ai/uploadform/Step";
import RatingSection from "../../components/ai/uploadform/RatingSection";

const AIUploadPage: React.FC = () => {
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const handleUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post(
        "http://localhost:6060/api/upload",
        formData
      );
      setProcessedImage(response.data);
    } catch (error) {
      console.error("파일 업로드 오류:", error);
    }
  };

  // 🔹 AI 분석 결과 보기 함수 추가
  const handleViewResults = () => {
    console.log("분석 결과 페이지로 이동!");
    // 여기서 분석 결과 페이지로 이동하는 로직을 추가하면 됨 (예: React Router 사용)
  };

  return (
    <PageLayout title="이미지 업로드" activeItem="이미지 업로드">
      <div className="flex flex-col items-center text-center w-full">
        {/* 🔹 onViewResults 속성 추가 */}
        <FileUploader onUpload={handleUpload} onViewResults={handleViewResults} />
        
        {processedImage && (
          <img
            src={processedImage}
            alt="AI 분석 결과"
            className="mt-6 border rounded"
          />
        )}
        <br/>
        <ProcessingSteps />
        <RatingSection />
      </div>
    </PageLayout>
  );
};

export default AIUploadPage;
