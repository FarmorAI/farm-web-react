import PageLayout from "../../../components/pagelayout/PageLayout";
import { useNavigate } from "react-router-dom";
import WriteForm from "../../../components/contents/WriteForm";
import { WriteFormData } from "../../../model/contents";

const BoardWritePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: WriteFormData, content: string) => {
    console.log("게시판 데이터:", { ...data, content });
    navigate("/contents/board");
  };

  return (
    <PageLayout title="게시판 작성" activeItem="게시판">
      <WriteForm title="게시판 작성" onSubmit={handleSubmit} />
    </PageLayout>
  );
};

export default BoardWritePage;
