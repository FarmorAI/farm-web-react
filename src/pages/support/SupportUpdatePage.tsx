import WriteForm from "../../components/contents/WriteForm";
import PageLayout from "../../components/pagelayout/PageLayout";
import useFetchUpdate from "../../hook/contents/useFetchUpdate";

const SupportUpdatePage = () => {
  const { register, handleSubmit, onSubmit, content, setContent, isSubmitting, navigate, initialData } = useFetchUpdate();

  return (
    <PageLayout title="문의사항 수정" activeItem="문의사항">
      <WriteForm
        title="문의사항 수정"
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

export default SupportUpdatePage;
