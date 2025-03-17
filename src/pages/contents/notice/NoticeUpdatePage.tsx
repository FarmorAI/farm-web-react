import PageLayout from "../../../components/pagelayout/PageLayout";
import useFetchUpdate from "../../../hook/contents/useFetchUpdate";
import WriteForm from "../../../components/contents/WriteForm";

const NoticeUpdatePage = () => {
  const title = "공지사항 수정";
  const { register, handleSubmit, onSubmit, content, setContent, isSubmitting, navigate, initialData } = useFetchUpdate(title);

  return (
    <PageLayout title="공지사항 수정" activeItem="공지사항">
      <WriteForm
        title="공지사항 수정"
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={(data) => onSubmit(data)} // ✅ content는 내부적으로 관리되므로 제거
        content={content}
        setContent={setContent}
        isSubmitting={isSubmitting}
        navigate={navigate}
        isEdit={true}
        initialData={initialData ?? { title: "", content: "" }} // ✅ 기본값 설정
        />
    </PageLayout>
  );
};

export default NoticeUpdatePage;
