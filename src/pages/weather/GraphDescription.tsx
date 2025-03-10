import React, { useEffect } from "react";
import GraphDisplay from "./GraphDisplay"; // 그래프 컴포넌트 불러오기
import { useNavigate } from "react-router-dom"; // 네비게이션 기능 추가

const GraphWithDescription: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
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
            }
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
        document.head.appendChild(style);
    }, []);

    return (
        <div className="max-w-[1500px] mx-auto px-6">
            {/* 제목 영역 */}
            <div
                className="bg-blue-50 text-gray-800 text-lg font-semibold py-3 px-4 rounded-t-lg flex items-center justify-between"
                style={{ fontFamily: "Gyeonggi_Title_Medium" }}
            >
                <span>📊 등급별 사과 무게 분포 한눈에 보기</span>
            </div>

            {/* 그래프 + 설명 + 버튼 컨테이너 */}
            <div className="p-6 border border-gray-200 flex flex-col gap-6 bg-white rounded-b-lg">
                {/* 그래프 & 설명 */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* 왼쪽: 그래프 */}
                    <div className="flex-1">
                        <GraphDisplay />
                    </div>

                    {/* 오른쪽: 설명 */}
                    <div
                        className="flex-1 bg-gray-50 p-5 rounded-lg shadow-sm text-gray-800 text-sm leading-relaxed overflow-y-auto max-h-[500px]"
                        style={{fontFamily: "GowunDodum-Regular"}}
                    >
                        {/* 1. 사과 등급별 무게 분포 */}
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">🍏 사과 등급별 무게 분포를 한눈에 확인하세요!</h3>
                        <p>
                            이 그래프는 사과의 등급(특·상·보통)별 평균 무게 분포를 나타낸 것입니다. 그래프에서 확인할 수 있는 내용은 다음과 같습니다.
                        </p>
                        <ul className="mt-2 list-disc list-inside">
                            <li>🟢 <strong>특</strong> 등급(녹색): 평균적으로 가장 무겁고, 고른 무게 분포를 보입니다.</li>
                            <li>🟠 <strong>상</strong> 등급(주황색): "보통" 등급(파란색)보다 무게가 무겁고, 분포가 더 일정합니다.</li>
                            <li>🔵 <strong>보통</strong> 등급: 비교적 가벼우며, 무게 분포가 넓게 퍼져 있습니다.</li>
                        </ul>

                        {/* 2. 내 사과는 어떤 등급에 속할까? */}
                        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900">🍏 내 사과는 어떤 등급에 속할까요?</h3>
                        <p>
                            그래프의 점선(---)은 각 등급별 정규분포 곡선을 나타냅니다. 즉, 각 등급에서 가장 흔한(평균에 가까운) 사과 무게를 예측할 수 있습니다.
                        </p>
                        <p className="mt-2">🔍 <strong>예를 들어, 내 사과가 280g이라면?</strong></p>
                        <ul className="list-disc list-inside">
                            <li>"보통" 등급의 평균보다 무거운 편이지만, "상" 등급에 해당할 가능성이 높습니다.</li>
                            <li>정규분포를 고려하면, 280g~320g 사이의 사과는 대부분 "상" 등급에 포함될 가능성이 큽니다.</li>
                        </ul>
                        <p className="mt-2">
                            ✅ <strong>따라서,</strong><br/>
                            - 등급별 수확 기준을 정할 때 활용할 수 있습니다.<br/>
                            - 소포장(선물용) 제품 기획 시, 무게 구간을 고려한 패킹이 가능합니다.<br/>
                            - 계약 재배 시, 유통업체가 원하는 무게 기준과 비교하여 출하 전략을 조정할 수 있습니다.
                        </p>

                        {/* 3. 내 농장의 수확 시점을 결정하는 데 도움이 됩니다! */}
                        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900">🍏 내 농장의 수확 시점을 결정하는 데 도움이
                            됩니다!</h3>
                        <p>
                            사과의 무게는 수확 시기 및 재배 방식에 따라 변할 수 있습니다. 그래프를 보면, 특 등급 사과의 무게는 350g 이상인 경우가 많습니다.
                        </p>
                        <p className="mt-2">
                            🔍 <strong>예를 들어, 현재 평균 무게가 320g 수준이라면?</strong><br/>
                            - 조금 더 익히면 "상" → "특" 등급으로 올라갈 가능성이 높습니다.<br/>
                            - 반면, 기상 상황(태풍·우박)으로 인해 조기 출하가 필요할 경우, 무게 분포를 고려해 최적의 수확 시점을 결정할 수 있습니다.
                        </p>
                        <p className="mt-2">
                            ✅ <strong>따라서,</strong><br/>
                            - 수확 시기를 조정해 등급을 높일 가능성을 예측할 수 있습니다.<br/>
                            - 등급에 따라 판매 가격이 다르므로, 최대한 높은 등급을 받을 수 있도록 전략을 세울 수 있습니다.
                        </p>
                    </div>
                </div>

                {/* 추가 박스 - 문의 버튼 */}
                <div
                    className="bg-blue-50 py-2 px-6 rounded-lg flex flex-col md:flex-row items-center justify-center gap-4">
                    <p
                        className="text-gray-800 font-semibold text-base text-center"
                        style={{fontFamily: "Gyeonggi_Title_Medium"}}
                    >
                        내 사과의 품질을 더 자세히 알고싶다면?&nbsp;&nbsp;&nbsp;&nbsp;▶
                    </p>
                    <div className="flex gap-8">
                        <button
                            onClick={() => navigate("/ai/uploadform")}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 px-4 rounded-lg shadow-md transition duration-300"
                            style={{fontFamily: "GowunDodum-Regular"}}
                        >
                            AI 분석 서비스 이용하기
                        </button>
                        <button
                            onClick={() => navigate("/contents/board")}
                            className="bg-blue-500 hover:bg-green-600 text-white font-semibold py-1.5 px-4 rounded-lg shadow-md transition duration-300"
                            style={{fontFamily: "GowunDodum-Regular" }}
                        >
                            게시판 질문하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphWithDescription;
