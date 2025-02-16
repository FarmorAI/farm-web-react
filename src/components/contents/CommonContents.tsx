import PageLayout from "../../components/pagelayout/PageLayout";
import { useNotices } from "../../hook/contents/useNotices";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import TableComponent from "./TableComponent";

interface CommonListPageProps {
  title: string;
  activeItem: string;
}

const CommonContents = ({ title, activeItem }: CommonListPageProps) => {
  const { notices, searchQuery, setSearchQuery, handleSearch, isLoading } = useNotices();

  return (
    <PageLayout title={title} activeItem={activeItem}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} totalResults={notices.length} />
      <TableComponent notices={notices} isLoading={isLoading} />
      <Pagination />
    </PageLayout>
  );
};

export default CommonContents;
