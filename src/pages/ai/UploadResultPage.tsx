import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import PageLayout from '../../components/pagelayout/PageLayout';
import { useParams } from 'react-router-dom';
import { AiListResponse, handleAiGetById } from '../../api/aiApi';
import type { EChartsOption } from 'echarts';

const UploadResultPage: React.FC = () => {
  const [aiInfo, setAiInfo] = useState<AiListResponse>();
  const { aiResultId } = useParams();

  useEffect(() => {
    const getAiInfo = async () => {
      try {
        const response = await handleAiGetById(parseInt(aiResultId || '0'));
        setAiInfo(response);
      } catch (error) {
        alert(error);
      }
    };
    getAiInfo();
  }, [aiResultId]);

  const apple = aiInfo?.applesResults?.[0];
  const red = apple?.redRatio || 0;
  const green = apple?.greenRatio || 0;
  const brown = apple?.brownRatio || 0;
  const ripeness = apple?.ripeness ? Math.round(apple.ripeness * 100) : 0;

  const qualityScore = Math.round((red + ripeness) / 2);
  const getGrade = (score: number) =>
      score >= 80 ? '최상급' : score >= 60 ? '상급' : score >= 40 ? '중급' : '하급';
  const marketValue = {
    '최상급': 3000,
    '상급': 2000,
    '중급': 1500,
    '하급': 1000,
  }[getGrade(qualityScore)] || 0;

  const pieOption: EChartsOption =  {
    series: [
      {
        name: '색상 분포',
        type: 'pie',
        radius: ['45%', '65%'],
        label: { formatter: '{b}: {c}%', fontSize: 14 },
        data: [
          { value: red, name: '빨강', itemStyle: { color: '#f87171' } },
          { value: brown, name: '갈색', itemStyle: { color: '#8B4513' } },
          { value: green, name: '초록', itemStyle: { color: '#4ade80' } },
        ],
      },
    ],
  };

  const gaugeOption: EChartsOption = {
    tooltip: {
      formatter: '{b}: {d}%',
    },
    series: [
      {
        name: '품질 등급',
        type: 'pie',
        radius: ['60%', '80%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          formatter: () => getGrade(qualityScore),
          fontSize: 28,
          fontWeight: 'bold',
          color: '#374151',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: aiInfo?.rateS ?? 0, name: '특', itemStyle: { color: '#EF4444' } },
          { value: aiInfo?.rateA ?? 0, name: '상', itemStyle: { color: '#F97316' } },
          { value: aiInfo?.rateB ?? 0, name: '보통', itemStyle: { color: '#FACC15' } },
        ],
      },
    ],
  };

  return (
      <PageLayout title="분석결과 현황" activeItem="분석결과 현황">
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
          {/* 이미지 */}
          <div className="flex justify-center">
            <img
                src={aiInfo?.imageUrl}
                alt="분석 이미지"
                className="w-96 h-auto object-contain rounded-lg shadow"
            />
          </div>

          {/* 요약 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 rounded-xl p-6 text-center">
            <div>
              <p className="text-sm text-gray-500">사과 수</p>
              <p className="text-2xl font-bold text-blue-600">{aiInfo?.appleCount}개</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">숙성도</p>
              <p className="text-2xl font-bold text-blue-600">{ripeness}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">품질 등급</p>
              <p className="text-2xl font-bold text-blue-600">{getGrade(qualityScore)}</p>
            </div>
          </div>

          {/* 그래프 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow border">
              <h3 className="text-lg font-semibold mb-4">색상 분포</h3>
              <ReactECharts option={pieOption} style={{ height: 300 }} />
            </div>
            <div className="bg-white p-6 rounded-xl shadow border">
              <h3 className="text-lg font-semibold mb-4">품질 등급</h3>
              <ReactECharts option={gaugeOption} style={{ height: 300 }} />
            </div>
          </div>

          {/* 숙성도 바 */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-lg font-semibold mb-4">숙성도 상태</h3>
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>숙성도</span>
              <span>{ripeness}%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                  className="h-full bg-yellow-500 transition-all duration-500"
                  style={{ width: `${ripeness}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>미숙</span>
              <span>적정</span>
              <span>과숙</span>
            </div>
          </div>

          {/* 최종 진단 결과 */}
          <div className="bg-white p-6 rounded-xl shadow border space-y-4">
            <h3 className="text-xl font-bold">최종 진단 결과</h3>

            <div className="flex justify-between p-4 rounded bg-blue-50 font-medium">
              <span>전체 품질 등급</span>
              <span className="text-blue-600">{getGrade(qualityScore)} {getGrade(qualityScore) === '최상급' && '(프리미엄)'}</span>
            </div>

            <div className="flex justify-between p-4 rounded bg-green-50 font-medium">
              <span>수확 적정 시기</span>
              <span className="text-green-600">{
                ripeness > 85 ? '과숙 주의' :
                    ripeness > 60 ? '최적기' :
                        '조금 더 숙성 필요'
              }</span>
            </div>

            <div className="flex justify-between p-4 rounded bg-yellow-50 font-medium">
              <span>예상 시장 가치</span>
              <span className="text-yellow-600">{marketValue.toLocaleString()}원/개</span>
            </div>

            {/* 진단 문구 동적 처리 */}
            <p className="text-sm text-gray-600">
              {
                getGrade(qualityScore) === '최상급' ? '색상과 숙성도가 모두 뛰어나며, 프리미엄 시장 유통이 가능합니다.' :
                    getGrade(qualityScore) === '상급' ? '품질이 우수하여 일반 시장에서 좋은 평가를 받을 수 있습니다.' :
                        getGrade(qualityScore) === '중급' ? '숙성이 어느 정도 진행되었으며, 빠른 유통을 추천드립니다.' :
                            '품질이 낮아 유통보다는 가공용 사용을 고려해주세요.'
              }
            </p>
          </div>
        </div>
      </PageLayout>
  );
};

export default UploadResultPage;