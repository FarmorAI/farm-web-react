import Sidebar from "./Sidebar";

interface PageLayoutProps {
  title: string;
  activeItem: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <div className="flex min-h-screen font-sans">
      {/* ✅ 공통 사이드바 */}
      <Sidebar />

      {/* ✅ 메인 콘텐츠 영역 */}
      <main className="flex-1  p-10 bg-white">
        <div className="max-w-7xl mx-3 ">
          {/* ✅ 공통 제목 바 */}
          <div className="flex flex-col mb-6">
            <h1 className="text-2xl font-bold">{title}</h1>
            <hr className="mt-2 border-t-2 border-gray-400" />
          </div>

          {/* ✅ 페이지별 컨텐츠 */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
