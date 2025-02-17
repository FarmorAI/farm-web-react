import React, { useRef, useState } from "react";
import axios from "axios";
import PageLayout from "../../components/pagelayout/PageLayout";

const AIUploadPage: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const uploadRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = () => {
        if (uploadRef.current?.files) {
            const selectedFiles = Array.from(uploadRef.current.files);
            setFiles(selectedFiles);
        }
    };

    const handleClickAdd = async () => {
        if (files.length === 0) {
            alert("파일을 선택해주세요!");
            return;
        }

        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        try {
            // Spring Boot에 파일 업로드 및 FastAPI 응답 즉시 받기
            const response = await axios.post("http://localhost:8080/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                responseType: "blob", // 바이너리 데이터로 응답 받음
            });

            if (response.data) {
                // ✅ 응답받은 바이너리 이미지를 Blob URL로 변환하여 표시
                const blob = new Blob([response.data], { type: "image/jpeg" });
                const imageUrl = URL.createObjectURL(blob);
                setProcessedImage(imageUrl);
            } else {
                throw new Error("이미지 응답 실패");
            }
        } catch (error) {
            console.error("파일 업로드 오류:", error);
            alert("파일 업로드 실패");
        }
    };

    return (
        <PageLayout title="AI 이미지 업로드" activeItem="AI 이미지 업로드">
        <div className="flex flex-col items-center">
            <input ref={uploadRef} type="file" multiple onChange={handleFileChange} />
            <button onClick={handleClickAdd}>파일 업로드 및 객체 인식</button>

            {/* ✅ 즉시 받은 객체 인식 이미지 표시 */}
            {processedImage && <img src={processedImage} alt="객체 인식 결과" width="500" />}
        </div>
        </PageLayout>
    );
};

export default AIUploadPage;