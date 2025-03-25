import {  useEffect, useState } from "react";
import PageLayout from "../../components/pagelayout/PageLayout";
import { AiListResponse, handleAiList } from "../../api/aiApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadListPage = () => {
  const [aiResults, setAiResults] = useState<AiListResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAiResults = async () => {
      try {
        const data = await handleAiList();
        console.log(data)
        if (data.length === 0) {
          setErrorMsg("데이터가 없습니다"); // ✅ 데이터가 비어있을 경우 메시지 출력
        } else {
          setAiResults(data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // 401 에러와 같은 특정 에러 코드 처리
          if (error.response) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            error.response.data.error === 'Unauthorized' ? setErrorMsg("로그인이 필요합니다.") : setErrorMsg("Premium 전용 기능 입니다.")
          } 
        } else { setErrorMsg('Unexpected Error:' + error); }
      } finally { setLoading(false); }
    };
    fetchAiResults();
  }, []);

  if (loading) {
    return (
      <PageLayout title="분석결과 목록" activeItem="분석결과 목록">
        <div className="text-center">로딩중...</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="분석결과 목록" activeItem="분석결과 목록">
      <div className="container">
        <div className="row">
          {errorMsg && (
            <div className="alert alert-danger" role="alert">{ errorMsg }</div>
          )}
          {aiResults.map((result, index) => (
            <div key={index} className="col-md-3 mb-3">
              <div
                className="card"
                onClick={() => navigate(`/ai/uploadresult/${result.aiResultId}`)}
                style={{ cursor: 'pointer', transition: 'transform 0.2s ease-in-out' }}
              >
                <div className="card-body">
                  <h5 className="card-title mb-3">분석ID: {result.aiResultId}</h5>
                  <div className="row">
                    <div className="col-12 mb-2">
                      <small className="text-muted">
                        생성일자: {new Date(result.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    <div className="col-4 mb-2">
                      <span className="fw-bold">특</span>
                      <div>{result.rateS}%</div>
                    </div>
                    <div className="col-4 mb-2">
                      <span className="fw-bold">상</span>
                      <div>{result.rateA}%</div>
                    </div>
                    <div className="col-4 mb-2">
                      <span className="fw-bold">보통</span>
                      <div>{result.rateB}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default UploadListPage;