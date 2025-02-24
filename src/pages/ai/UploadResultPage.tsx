import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

// 타입 정의
interface StrawberryAnalysis {
    growthStatus: { maturity: number }; // 0~1 (0~100%)
    healthStatus: { good: number, moderate: number, bad: number }; // 비율
    quality: { colorUniformity: number, size: number, defectFree: number }; // 0~100
    maturityDistribution: { red: number, intermediate: number, green: number }; // 비율
}

const UploadResultPage: React.FC = () => {
    const dummyData: StrawberryAnalysis = {
        growthStatus: { maturity: 0.7 }, // 70%
        healthStatus: { good: 75, moderate: 15, bad: 10 }, // 비율
        quality: { colorUniformity: 90, size: 85, defectFree: 95 }, // 0~100
        maturityDistribution: { red: 60, intermediate: 30, green: 10 } // 비율
    };

    const growthChartRef = useRef<HTMLDivElement>(null);
    const healthChartRef = useRef<HTMLDivElement>(null);
    const qualityChartRef = useRef<HTMLDivElement>(null);
    const maturityPieChartRef = useRef<HTMLDivElement>(null);
    const qualityBarChartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // SVG 정의 (딸기 모양 마스크)
        const svgMask = `
            <svg style="position: absolute; width: 0; height: 0;">
                <defs>
                    <mask id="strawberry-shape">
                        <path fill="#fff" d="M100,20 C80,10 120,10 100,30 C70,40 50,70 60,100 C70,130 130,130 140,100 C150,70 130,40 100,30 Z M80,10 H120 V20 H80 Z" />
                    </mask>
                </defs>
            </svg>
        `;
        document.body.insertAdjacentHTML('beforeend', svgMask);

        // CSS 스타일
        const styles = `
            .strawberry { background-color: #FF5A5F; }
            .leaf-green { color: #34C759; }
            .text-strawberry { color: #FF5A5F; }
            .transition-shadow { transition: box-shadow 0.3s ease, transform 0.3s ease; }
            .hover/:shadow-lg:hover { 
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.06);
                transform: translateY(-5px);
            }

            .glass-card {
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
            }

            #growthChart { position: relative; }
            .strawberry-mask { 
                position: absolute; 
                top: 50%; 
                left: 50%; 
                transform: translate(-50%, -50%); 
                width: 220px; 
                height: 220px; 
                -webkit-mask: url(#strawberry-shape); 
                mask: url(#strawberry-shape); 
                overflow: hidden; 
                z-index: 10; 
                animation: pulse 2s infinite ease-in-out;
            }

            @keyframes pulse {
                0% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.05); }
                100% { transform: translate(-50%, -50%) scale(1); }
            }

            .animate-slide-up {
                animation: slideUp 0.5s ease-out;
            }

            @keyframes slideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .chart-title {
                font-size: 1.25rem;
                font-weight: 600;
                color: #2d3748;
                text-align: center;
                margin-bottom: 1rem;
            }

            .chart-container {
                position: relative;
                overflow: hidden;
                border-radius: 15px;
            }

            .chart-container:hover .chart-title {
                color: #FF5A5F;
            }

            .progress-container {
                position: relative;
                width: 100%;
                height: 20px;
                background: #edf2f7;
                border-radius: 10px;
                overflow: hidden;
            }

            .progress-bar {
                height: 100%;
                background: linear-gradient(45deg, #FF5A5F, #FF8A8F);
                border-radius: 10px;
                transition: width 0.3s ease;
            }

            .progress-label {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #fff;
                font-size: 0.9rem;
                font-weight: 600;
            }
        `;
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);

        // 차트 초기화
        let growthChart: echarts.ECharts | null = null;
        let healthChart: echarts.ECharts | null = null;
        let qualityChart: echarts.ECharts | null = null;
        let maturityPieChart: echarts.ECharts | null = null;
        let qualityBarChart: echarts.ECharts | null = null;

        if (growthChartRef.current) {
            growthChart = echarts.init(growthChartRef.current);
            growthChart.setOption({
                series: [{
                    type: 'liquidFill',
                    data: [dummyData.growthStatus.maturity],
                    radius: '90%',
                    color: ['#FF5A5F', '#FF8A8F'],
                    backgroundStyle: { color: 'transparent' },
                    outline: { show: false },
                    label: { 
                        fontSize: 28, 
                        color: '#FF5A5F', 
                        formatter: '숙성도\n{value|' + (dummyData.growthStatus.maturity * 100) + '%}',
                        rich: { value: { fontSize: 32, fontWeight: 'bold' } },
                        position: 'center'
                    },
                    animationDuration: 2000,
                    animationEasing: 'elasticOut'
                }],
                animation: true
            });
        }

        if (healthChartRef.current) {
            healthChart = echarts.init(healthChartRef.current);
            healthChart.setOption({
                series: [{
                    type: 'pie',
                    radius: ['40%', '70%'],
                    data: [
                        { value: dummyData.healthStatus.good, name: '양호', itemStyle: { color: '#FF5A5F' } },
                        { value: dummyData.healthStatus.moderate, name: '보통', itemStyle: { color: '#FFB3B3' } },
                        { value: dummyData.healthStatus.bad, name: '위험', itemStyle: { color: '#FFD9D9' } }
                    ],
                    label: { 
                        show: true, 
                        position: 'outside', 
                        formatter: '{b}\n{d}%',
                        fontSize: 12,
                        color: '#4a5568'
                    },
                    animationDuration: 1500,
                    animationEasing: 'cubicOut'
                }]
            });
        }

        if (qualityChartRef.current) {
            qualityChart = echarts.init(qualityChartRef.current);
            qualityChart.setOption({
                radar: {
                    indicator: [
                        { name: '색상 균일성', max: 100 },
                        { name: '크기', max: 100 },
                        { name: '결함 없음', max: 100 }
                    ],
                    radius: 80,
                    shape: 'circle',
                    splitArea: { show: false },
                    axisLine: { 
                        lineStyle: { 
                            color: '#a0aec0', // 더 선명한 회색으로 변경
                            width: 2          // 선 두께 증가
                        } 
                    },
                    splitLine: { 
                        lineStyle: { 
                            color: '#a0aec0', // 더 선명한 회색으로 변경
                            width: 1          // 선 두께 미세 조정
                        } 
                    },
                    name: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#1a202c', // 더 선명한 검정색
                            fontSize: 18,     // 폰트 크기 증가
                            fontWeight: 'bold',
                            padding: [0, 0, 15, 0] // 아래로 더 큰 패딩 추가
                        }
                    }
                },
                series: [{
                    type: 'radar',
                    data: [{ value: [dummyData.quality.colorUniformity, dummyData.quality.size, dummyData.quality.defectFree], name: '품질', itemStyle: { color: '#FF5A5F' } }],
                    areaStyle: { 
                        opacity: 0.6,    // 투명도 약간 증가로 더 두드러지게
                        color: '#FF5A5F' 
                    },
                    lineStyle: { 
                        width: 3,        // 선 두께 증가
                        color: '#FF5A5F' 
                    },
                    animationDuration: 2000,
                    animationEasing: 'elasticOut',
                    label: {
                        show: true,
                        formatter: function(params: any) {
                            return params.value[params.seriesIndex] + '%'; // 데이터 값 표시
                        },
                        position: 'outside', // 레이블을 차트 외부로 이동
                        fontSize: 16,        // 데이터 레이블 크기 더 증가
                        color: '#1a202c',
                        distance: 15,        // 레이블과 차트 간 간격 더 넓게
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // 레이블 배경 추가
                        borderRadius: 5,     // 레이블 둥근 모서리
                        padding: [5, 10]     // 레이블 패딩 추가
                    }
                }],
                tooltip: { 
                    trigger: 'item', 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    textStyle: { color: '#2d3748' },
                    formatter: '{b}: {c}%'
                },
                backgroundColor: 'transparent' // 차트 배경 투명 유지
            });
        }

        if (maturityPieChartRef.current) {
            maturityPieChart = echarts.init(maturityPieChartRef.current);
            maturityPieChart.setOption({
                series: [{
                    type: 'pie',
                    radius: ['40%', '70%'],
                    data: [
                        { value: dummyData.maturityDistribution.red, name: '빨간색', itemStyle: { color: '#FF5A5F' } },
                        { value: dummyData.maturityDistribution.intermediate, name: '중간', itemStyle: { color: '#FFB3B3' } },
                        { value: dummyData.maturityDistribution.green, name: '녹색', itemStyle: { color: '#A5D6A7' } }
                    ],
                    label: { 
                        show: true, 
                        position: 'outside', 
                        formatter: '{b}\n{d}%',
                        fontSize: 12,
                        color: '#4a5568'
                    },
                    animationDuration: 1500,
                    animationEasing: 'cubicOut'
                }],
                tooltip: { trigger: 'item', backgroundColor: 'rgba(255, 255, 255, 0.9)', textStyle: { color: '#2d3748' } }
            });
        }

        if (qualityBarChartRef.current) {
            qualityBarChart = echarts.init(qualityBarChartRef.current);
            qualityBarChart.setOption({
                xAxis: { 
                    type: 'category', 
                    data: ['색상 균일도', '크기', '결함 없음'],
                    axisLabel: { color: '#4a5568' },
                    axisLine: { lineStyle: { color: '#e2e8f0' } }
                },
                yAxis: { 
                    type: 'value', 
                    max: 100,
                    axisLabel: { color: '#4a5568' },
                    axisLine: { lineStyle: { color: '#e2e8f0' } },
                    splitLine: { lineStyle: { color: '#e2e8f0' } }
                },
                series: [{
                    type: 'bar',
                    data: [dummyData.quality.colorUniformity, dummyData.quality.size, dummyData.quality.defectFree],
                    itemStyle: { 
                        color: '#FF5A5F',
                        borderRadius: [10, 10, 0, 0]
                    },
                    barWidth: '40%',
                    animationDuration: 1500,
                    animationEasing: 'elasticOut'
                }],
                tooltip: { trigger: 'axis', backgroundColor: 'rgba(255, 255, 255, 0.9)', textStyle: { color: '#2d3748' } }
            });
        }

        // 리사이징 처리
        const resizeObserver = new ResizeObserver(() => {
            [growthChart, healthChart, qualityChart, maturityPieChart, qualityBarChart].forEach(chart => {
                if (chart) chart.resize();
            });
        });

        const observeRefs = [
            growthChartRef, healthChartRef, qualityChartRef,
            maturityPieChartRef, qualityBarChartRef
        ];
        observeRefs.forEach(ref => {
            if (ref.current) resizeObserver.observe(ref.current);
        });

        // 클린업
        return () => {
            [growthChart, healthChart, qualityChart, maturityPieChart, qualityBarChart].forEach(chart => {
                if (chart) chart.dispose();
            });
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-md p-4 flex justify-between items-center rounded-b-2xl animate-slide-up">
                <div className="flex items-center">
                    <img src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png" alt="로고" className="h-10 w-auto transition-transform duration-300 hover:scale-105" />
                    <h1 className="ml-4 text-2xl font-bold text-gray-900 transition-colors duration-300 hover:text-strawberry">Farmorai - 딸기 분석</h1>
                </div>
                <button className="strawberry text-white px-5 py-2 rounded-full flex items-center transition-all duration-300 hover:bg-opacity-90 hover:scale-105">
                    <i className="fas fa-download mr-2"></i> 데이터 내보내기
                </button>
            </nav>
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white glass-card p-6 mb-8 animate-slide-up">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">딸기 이미지 업로드</h3>
                    <input type="file" accept="image/*" id="imageUpload" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:strawberry file:text-white hover:file:bg-opacity-90 file:transition-all file:duration-300" />
                    <img id="preview" className="mt-4 rounded-lg w-full h-64 object-cover hidden shadow-md transition-opacity duration-300" alt="딸기 미리보기" />
                </div>
                <div className="bg-white glass-card p-6 mb-8 relative animate-slide-up">
                    <h3 className="chart-title">생육 상태</h3>
                    <div ref={growthChartRef} className="h-64 relative"></div>
                    <div className="strawberry-mask">
                        <div id="growthChartOverlay" className="h-full w-full"></div>
                    </div>
                    <p className="text-center text-gray-600 mt-2 transition-colors duration-300 hover:text-strawberry">크기: 중간 | 색상: 70% 빨강 | 형태: 균일</p>
                    <p className="text-center text-xs text-gray-400 mt-1">사진 기반 추정</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white glass-card p-6 animate-slide-up">
                        <h3 className="chart-title">건강 상태</h3>
                        <div ref={healthChartRef} className="h-64"></div>
                        <p className="text-center text-gray-600 mt-2 transition-colors duration-300 hover:text-strawberry">잎: 건강 | 표면: 작은 반점 (초기 곰팡이병 가능성 60%)</p>
                        <p className="text-center text-xs text-gray-400 mt-1">사진 기반 추정</p>
                    </div>
                    <div className="bg-white glass-card p-6 animate-slide-up">
                        <h3 className="chart-title">품질 등급</h3>
                        <div ref={qualityChartRef} className="h-64"></div>
                        <p className="text-center text-gray-600 mt-2 transition-colors duration-300 hover:text-strawberry">A급 (색상 90% 균일, 결함 없음)</p>
                        <p className="text-center text-xs text-gray-400 mt-1">사진 기반 추정</p>
                    </div>
                </div>
                <div className="bg-white glass-card p-6 mb-8 animate-slide-up">
                    <h3 className="chart-title">수확 시기 예측</h3>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: '70%' }}></div>
                        <span className="progress-label">70% (약 10일 후 최적 수확, 3월 15일)</span>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-1">사진 기반 추정</p>
                </div>
                <div className="bg-white glass-card p-6 mb-8 animate-slide-up">
                    <h3 className="chart-title">딸기 성숙도 분포</h3>
                    <div ref={maturityPieChartRef} className="h-64"></div>
                    <p className="text-center text-gray-600 mt-2 transition-colors duration-300 hover:text-strawberry">빨간색 60%, 중간 30%, 녹색 10%</p>
                    <p className="text-center text-xs text-gray-400 mt-1">사진 기반 추정</p>
                </div>
                <div className="bg-white glass-card p-6 mb-8 animate-slide-up">
                    <h3 className="chart-title">품질 점수 비교</h3>
                    <div ref={qualityBarChartRef} className="h-64"></div>
                    <p className="text-center text-gray-600 mt-2 transition-colors duration-300 hover:text-strawberry">색상 90, 크기 85, 결함 95</p>
                    <p className="text-center text-xs text-gray-400 mt-1">사진 기반 추정</p>
                </div>
                <div className="bg-white glass-card p-6 mb-8 animate-slide-up">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">AI 분석 결과</h3>
                    <p className="text-gray-700">현재 작물의 생육 상태가 <span className="font-semibold text-strawberry animate-pulse">매우 양호</span>합니다. 잎의 색상과 크기가 정상 범위 내에 있으며, 병해충의 징후는 발견되지 않았습니다.</p>
                    <p className="text-xs text-gray-400 mt-2">사진 기반 분석 결과</p>
                </div>
                <div className="bg-white glass-card p-6 animate-slide-up">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">추천 관리 방안</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-[#FFF5E6] rounded-lg p-4 flex items-center shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
                            <i className="fas fa-tint text-strawberry text-xl mr-3 animate-bounce"></i>
                            <p className="text-gray-800"><span className="font-semibold text-strawberry">주 2회</span> 관수 실시</p>
                        </div>
                        <div className="bg-[#FFF5E6] rounded-lg p-4 flex items-center shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
                            <i className="fas fa-leaf text-leaf-green text-xl mr-3 animate-pulse"></i>
                            <p className="text-gray-800">질소 비료 <span className="font-semibold text-strawberry">20% 감량</span></p>
                        </div>
                        <div className="bg-[#FFF5E6] rounded-lg p-4 flex items-center shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
                            <i className="fas fa-sun text-strawberry text-xl mr-3 animate-spin-slow"></i>
                            <p className="text-gray-800"><span className="font-semibold text-strawberry">차광막</span> 조절</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">사진 기반 분석 결과</p>
                </div>
            </main>
        </div>
    );
};

export default UploadResultPage;