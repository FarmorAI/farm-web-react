import { useEffect, useState } from "react";
import { fetchBugInfo } from "../../api/infoApi.ts";

interface BugInfo {
    title: string;
    fileurl: string;
}

const PestInfoDisplay: React.FC = () => {
    const style = document.createElement("style");
    style.innerHTML = `
            @font-face {
                font-family: 'Gyeonggi_Title_Medium';
                src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2410-3@1.0/Title_Medium.woff') format('woff');
                font-weight: 500;
                font-style: normal;
            }
            @font-face {
                font-family: 'GowunDodum-Regular';
                src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunDodum-Regular.woff') format('woff');
                font-weight: normal;
                font-style: normal;
            }`;
    document.head.appendChild(style);

    const [bugInfo, setBugInfo] = useState<BugInfo[]>([]);

    useEffect(() => {
        const loadBugInfo = async () => {
            const data = await fetchBugInfo();
            setBugInfo(data);
        };
        loadBugInfo();
    }, []);

    const customScrollStyle = `
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: rgba(107, 114, 128, 0.7);
            border-radius: 10px;
        }
        ::-webkit-scrollbar-track {
            background-color: transparent;
        }
    `;

    return (
        <div className="bg-white rounded-lg shadow-lg w-[20%] h-[420px] flex flex-col text-center border border-gray-300 overflow-hidden">
            <style>{customScrollStyle}</style>

            {/* 제목 영역 추가 */}
            <div className="bg-blue-50 text-gray-800 text-lg font-semibold py-2 px-4 rounded-t-lg flex items-center" style={{ fontFamily: "Gyeonggi_Title_Medium" }}>
                🐞 병해충 발생 정보 다운받기
            </div>

            <div className="overflow-y-auto overflow-x-hidden h-full p-2" style={{ fontFamily: "GowunDodum-Regular" }}>
                <div className="flex flex-col space-y-4">
                    {bugInfo.slice(0, 10).map((item, index) => (
                        <div
                            key={index}
                            className="p-3 border-b border-gray-200 text-left block hover:bg-gray-100 transition flex items-center justify-between"
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-600 flex-shrink-0">▪</span>
                                <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
                            </div>
                            <a
                                href={item.fileurl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 text-lg"
                            >
                                📥
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PestInfoDisplay;