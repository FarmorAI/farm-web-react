import { useForm } from "react-hook-form";
import { WriteFormData, WriteFormProps } from "../../model/contents";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";


const WriteForm: React.FC<WriteFormProps>  = ({ title, onSubmit}) => {
  const { register , handleSubmit } = useForm<WriteFormData>();
  const [ content, setContent ] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (data: WriteFormData) => {
    onSubmit(data, content);
  };


  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <table className="w-full border border-gray-300">
          <tbody>
            <tr className="border-b">
              <td className="bg-gray-100 px-4 py-2 font-semibold w-1/5">제목</td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="w-full p-2 border rounded"
                />
              </td>
            </tr>
            <tr>
              <td className="bg-gray-100 px-4 py-2 font-semibold align-top">내용</td>
              <td className="px-4 py-4">
                <SunEditor
                  setContents={content}
                  onChange={setContent}
                  setOptions={{
                    height: "400px",
                    buttonList: [
                      ["bold", "underline", "italic", "strike"],
                      ["font", "align", "list", "image", "link"],
                    ],
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className="bg-gray-100 px-4 py-2 font-semibold">파일 #1</td>
              <td className="px-4 py-2">
                <input type="file" {...register("file1")} />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end mt-8 space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            취소
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            type="submit"
          >
            작성 완료
          </button>
        </div>
      </form>
    </div>
  );
};
  

export default WriteForm;
