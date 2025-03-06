import PageLayout from "../../../components/pagelayout/PageLayout";
import useFetchUpdate from "../../../hook/contents/useFetchUpdate";
import WriteForm from "../../../components/contents/WriteForm";

const NoticeUpdatePage = () => {
  const { register, handleSubmit, onSubmit, content, setContent, isSubmitting, navigate, initialData } = useFetchUpdate();

  return (
    <PageLayout title="공지사항 수정" activeItem="공지사항">
      <WriteForm
        title="공지사항 수정"
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit} // ✅ content는 내부에서 관리되므로 그대로 전달
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
