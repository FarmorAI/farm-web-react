import React, { useState } from "react";
import {detectObjects} from "../../api/detect.ts";


const DetectPage: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [resultImage, setResultImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const handleDetect = async () => {
        if (!image) {
            alert("이미지를 선택하세요.");
            return;
        }
        const detectedImageUrl = await detectObjects(image);
        if (detectedImageUrl) {
            setResultImage(detectedImageUrl);
        }
    };

    console.log(resultImage);
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">AI 객체 탐지 시스템</h2>
            <input type="file" onChange={handleImageChange} className="border p-2 mt-2" />
            <button onClick={handleDetect} className="bg-blue-500 text-white p-2 ml-2">
                객체 탐지 실행
            </button>

            {resultImage && (
                <div className="mt-4">
                    <h3>탐지 결과:</h3>
                    {/* ✅ 결과 이미지가 올바르게 표시되도록 URL을 `src`에 지정 */}
                    <img src={resultImage} alt="Detection Result" className="border p-2 max-w-full" />
                </div>
            )}
        </div>
    );
};

export default DetectPage;