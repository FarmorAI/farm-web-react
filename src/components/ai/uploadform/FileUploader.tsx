import { useRef, useState } from "react";
import { CloudUpload, FileText } from "lucide-react";

interface FileUploaderProps {
  onUpload: (files: File[], name: string) => void;
  onViewResults: () => void; // 분석 결과 보기 버튼 클릭 이벤트
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, onViewResults }) => {
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false); // AI 분석 중인지 여부
  const [fileName, setFileName] = useState(""); // 사용자가 입력하는 파일 이름

  const handleFileChange = () => {
    if (uploadRef.current?.files) {
      const selectedFiles = Array.from(uploadRef.current.files);
      processFiles(selectedFiles);
    }
  };

  const processFiles = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    if (selectedFiles.length > 0) {
      setImagePreview(URL.createObjectURL(selectedFiles[0]));
    }
  };

  const handleRemoveImage = () => {
    setFiles([]);
    setImagePreview(null);
    setFileName(""); // 파일 제거 시 이름도 초기화
  };

  const handleUploadClick = () => {
    if (files.length === 0) {
      alert("파일을 선택해주세요!");
      return;
    }
    if (!fileName.trim()) {
      alert("파일 이름을 입력해주세요!");
      return;
    }

    setIsProcessing(true); // AI 분석 화면으로 변경
    onUpload(files, fileName);
  };

  const handleReset = () => {
    setFiles([]);
    setImagePreview(null);
    setIsProcessing(false);
    setFileName(""); // 초기화
  };

  return (
    <div className="flex flex-col items-center">
      {/* AI 분석 결과 화면 */}
      {isProcessing ? (
        <div className="w-full max-w-xl p-6 bg-blue-400 text-white rounded-lg text-center">
          <h2 className="text-2xl font-bold">완료</h2>
          <p className="mt-2">작업이 완료되었습니다. 결과물을 확인하세요.</p>
          <div className="mt-4 flex gap-4 justify-center">
            <button
              onClick={onViewResults}
              className="px-4 py-2 bg-white text-gray-800 rounded-md flex items-center gap-2"
            >
              <FileText size={18} />
              분석 결과 보기
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              처음으로 돌아가기
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* 파일 업로드 박스 */}
          <div
            className="w-full mx-10 p-20 border-2 border-dashed border-gray-300 rounded-lg bg-white text-center cursor-pointer flex flex-col items-center justify-center relative"
            onClick={() => uploadRef.current?.click()}
          >
            {imagePreview ? (
              <div className="relative w-full h-64 flex flex-col items-center justify-center">
                <img
                  src={imagePreview}
                  alt="미리보기"
                  className="max-h-64 object-contain"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  ✖
                </button>
              </div>
            ) : (
              <>
                <CloudUpload size={50} className="text-blue-500 mb-2" />
                <span className="text-lg font-medium text-gray-700">
                  클릭하거나 파일을 드래그하여 업로드
                </span>
                <span className="text-sm text-gray-500 mt-1">
                  5MB 미만의 jpg/png 파일
                </span>
              </>
            )}
            <input
              ref={uploadRef}
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* 파일 이름 입력 필드 */}
          <input
            type="text"
            placeholder="파일 이름을 입력하세요"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="mt-4 px-4 py-2 border border-gray-300 rounded-md w-full max-w-md text-center"
          />

          {/* 업로드 버튼 */}
          <button
            onClick={handleUploadClick}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            disabled={files.length === 0 || !fileName.trim()}
          >
            파일 업로드 및 AI 분석
          </button>
        </>
      )}
    </div>
  );
};

export default FileUploader;
