import {useEffect, useState} from "react";
import PageLayout from "../../components/pagelayout/PageLayout";
import {AiListResponse, handleAiList} from "../../api/aiApi";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const UploadListPage = () => {
    const [aiResults, setAiResults] = useState<AiListResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAiResults = async () => {
            try {
                const data = await handleAiList();
                if (data.length === 0) {
                    setErrorMsg("데이터가 없습니다");
                } else {
                    setAiResults(data);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        error.response.data.error === 'Unauthorized'
                            ? setErrorMsg("로그인이 필요합니다.")
                            : setErrorMsg("Premium 전용 기능입니다.");
                    }
                } else {
                    setErrorMsg("Unexpected Error: " + error);
                }
            } finally {
                setLoading(false);
            }
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
            <div className="px-4 py-6">
                {errorMsg && (
                    <div className="text-red-500 font-semibold text-center mb-4">{errorMsg}</div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {aiResults.map((result, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer p-5"
                            onClick={() => navigate(`/ai/uploadresult/${result.aiResultId}`)}
                        >
                            <div className="mb-2">
                                <h6 className="text-gray-800 font-semibold">분석 ID: {result.aiResultId}</h6>
                                <p className="text-sm text-gray-500">생성일: {new Date(result.createdAt).toLocaleDateString()}</p>
                            </div>

                            <div className="border-t border-gray-200 my-3"></div>

                            {/* 등급 비율 */}
                            <div className="flex justify-between text-center text-sm mb-4">
                                <div>
                                    <div className="font-bold text-green-600">특</div>
                                    <div>{(result.rateS * 100).toFixed(0)}%</div>
                                </div>
                                <div>
                                    <div className="font-bold text-yellow-500">상</div>
                                    <div>{(result.rateA * 100).toFixed(0)}%</div>
                                </div>
                                <div>
                                    <div className="font-bold text-gray-500">보통</div>
                                    <div>{(result.rateB * 100).toFixed(0)}%</div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 my-3"></div>

                            {/* 색상 비율 */}
                            <div className="flex justify-between text-center text-sm">
                                <div>
                                    <div className="font-bold text-red-500">빨강</div>
                                    <div>{result.redRatio}%</div>
                                </div>
                                <div>
                                    <div className="font-bold text-green-600">초록</div>
                                    <div>{result.greenRatio}%</div>
                                </div>
                                <div>
                                    <div className="font-bold text-yellow-800">갈색</div>
                                    <div>{result.brownRatio}%</div>
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