import { useParams } from "react-router-dom";
import SupportDetail from "../../components/contents/support/SupportDetail";

const SupportDetailPage = () => {
   const { id } = useParams<{ id: string }>();

   return <SupportDetail inquiryId={id ? parseInt(id, 10) : undefined} />;
};

export default SupportDetailPage;