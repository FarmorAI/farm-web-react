import React, { useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import './Upload.css';
import PageLayout from '../../components/pagelayout/PageLayout';
import { EChartsOption } from 'echarts';


const App: React.FC = () => {
  // 색상 분포에서 빨간색 퍼센트
  const redPercentage = 70;
  // 숙성도 상태 퍼센트
  const ripenessPercentage = 75;

  // 품질 지수 계산 (빨간색 퍼센트 + 숙성도 퍼센트) / 2
  const qualityScore = Math.round((redPercentage + ripenessPercentage) / 2);

  // 품질 등급 계산 함수
  const getQualityGrade = (score: number): string => {
    if (score >= 80 && score <= 100) {
      return '최상급';
    } else if (score >= 60 && score < 80) {
      return '상급';
    } else if (score >= 40 && score < 60) {
      return '중급';
    } else {
      return '하급';
    }
  };

  // 품질 등급에 따라 설명 텍스트 생성
  const qualityDescription = `품질 지수 ${qualityScore}점은 ${getQualityGrade(qualityScore)} 사과를 의미합니다.`;

  // 예상 시장 가치 계산
  const getMarketValue = (grade: string): number => {
    switch (grade) {
      case '최상급':
        return 3000;
      case '상급':
        return 2000;
      case '중급':
        return 1500;
      case '하급':
        return 1000;
      default:
        return 0;
    }
  };

  const marketValue = getMarketValue(getQualityGrade(qualityScore));

  // 품질 지수용 원형 프로그레스 옵션
  const colorPieOption: EChartsOption  = {
    animation: false,
    tooltip: { trigger: 'item' },
    series: [
      {
        name: '색상 분포',
        type: 'pie',
        radius: ['45%', '65%'],
        avoidLabelOverlap: true,
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {c}%',
          fontSize: 14,
          color: '#333',
          fontFamily: 'Noto Sans KR',
        },
        labelLine: {
          length: 15,
          length2: 30,
          smooth: true,
        },
        itemStyle: { borderRadius: 5, borderColor: '#fff', borderWidth: 2 },
        data: [
          { value: 70, name: '빨강', itemStyle: { color: '#FF6B6B' } },
          { value: 20, name: '갈색', itemStyle: { color: '#8B4513' } },
          { value: 10, name: '초록', itemStyle: { color: '#82C91E' } },
        ],
      },
    ],
  };
  
  const circularProgressOption: EChartsOption = {
    animation: false,
    series: [
      {
        type: 'pie',
        radius: ['65%', '85%'],
        silent: true,
        label: {
          show: true,
          position: 'center',
          formatter: '{c}%',
          fontSize: 48,
          color: '#28C76F',
          fontWeight: 'bold',
          fontFamily: 'Noto Sans KR',
        },
        labelLine: { show: false },
        data: [
          { value: qualityScore, name: '품질', itemStyle: { color: '#28C76F' } },
          { value: 100 - qualityScore, name: '', itemStyle: { color: '#E0E0E0' } },
        ],
      },
    ],
  };
  useEffect(() => {
    const handleResize = () => {
      const qualityGauge = document.getElementById('qualityGauge')?.getElementsByClassName('echarts-for-react')[0] as HTMLElement | undefined;
      const colorPie = document.getElementById('colorPie')?.getElementsByClassName('echarts-for-react')[0] as HTMLElement | undefined;
      if (qualityGauge) qualityGauge.style.height = '300px';
      if (colorPie) colorPie.style.height = '300px';
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (  
    <PageLayout title="분석결과 현황" activeItem="분석결과 현황">
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '32px' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
          {/* 상단: 이미지와 기본 정보 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
            <div style={{ width: '100%', maxWidth: '448px', marginBottom: '24px' }}>
              <img
                src="https://creatie.ai/ai/api/search-image?query=A photorealistic high-quality red apple on a pure white background, showing perfect texture and natural lighting, professional product photography style&width=400&height=400&orientation=squarish&flag=75c2223a-c0f5-4db1-ab82-7a29fde29a9e&flag=b226e182-aaff-4005-ad58-6eec5cbf4056&flag=e55038e1-3c3f-4ff1-8aed-016298f9aebb&flag=7c325e00-f0c3-4215-b894-9cf3f1f09370&flag=3b36e576-b2b7-4fb2-96bb-59c8031bf5a3&flag=e9248e07-150a-45f4-a704-6d5586bb0e3b&flag=dd11f212-0f03-49f7-bfb4-39e163a4425d&flag=b7f8e6e8-4603-4d12-88c5-0a36919f0360"
                alt="사과 이미지"
                style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', objectFit: 'contain' }}
              />
            </div>
            <div style={{ backgroundColor: '#eff6ff', borderRadius: '8px', padding: '24px', width: '100%', maxWidth: '832px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', textAlign: 'center' }}>
                <div>
                  <p style={{ color: '#6b7280', fontSize: '12px' }}>분석된 사과</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>1개</p>
                </div>
                <div>
                  <p style={{ color: '#6b7280', fontSize: '12px' }}>숙성도</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>{ripenessPercentage}%</p>
                </div>
                <div>
                  <p style={{ color: '#6b7280', fontSize: '12px' }}>품질</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>{getQualityGrade(qualityScore)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 하단: 분석 결과 */}
          <div className="analysis-grid">
            {/* 좌측: 색상 분포 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '24px', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>색상 분포</h3>
                <div id="colorPie">
                  <ReactECharts option={colorPieOption} style={{ height: '300px', width: '100%' }} />
                </div>
                <p style={{ textAlign: 'center', fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>최상급 색상</p>
                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '16px', textAlign: 'center' }}>
                  붉은색이 {redPercentage}%로 우수한 착색도를 보여주며, 이는 최적의 수확 시기임을 나타냅니다.
                </p>
              </div>
            </div>

            {/* 우측: 품질 지수 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '24px', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>품질 지수</h3>
                <div id="qualityGauge">
                  <ReactECharts option={circularProgressOption} style={{ height: '300px', width: '100%' }} />
                </div>
                <p style={{ textAlign: 'center', fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>{getQualityGrade(qualityScore)} 품질</p>
                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '16px', textAlign: 'center' }}>
                  {qualityDescription}
                </p>
              </div>
            </div>
          </div>

          {/* 숙성도 상태 (가로로 쭉) */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '24px', border: '1px solid #e5e7eb', marginTop: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>숙성도 상태</h3>
            <div style={{ paddingTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280' }}>숙성도</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#d97706' }}>{ripenessPercentage}%</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '16px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#f59e0b', height: '16px', width: `${ripenessPercentage}%`, transition: 'width 0.5s ease-in-out' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                <span>미숙</span>
                <span>적정</span>
                <span>과숙</span>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '16px' }}>
              사과의 숙성도는 {ripenessPercentage}%로, 품질등급 {getQualityGrade(qualityScore)}에 해당하는 최적의 상태입니다. 이는 수확하기 가장 좋은 시기임을 의미합니다.
            </p>
          </div>

          {/* 최종 진단 결과 */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '24px', border: '1px solid #e5e7eb', marginTop: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>최종 진단 결과</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
                <span style={{ fontWeight: '500', color: '#374151' }}>전체 품질 등급</span>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb' }}>{getQualityGrade(qualityScore)} (프리미엄)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#ecfdf5', borderRadius: '8px' }}>
                <span style={{ fontWeight: '500', color: '#374151' }}>수확 적정 시기</span>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#16a34a' }}>최적기</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#fefcbf', borderRadius: '8px' }}>
                <span style={{ fontWeight: '500', color: '#374151' }}>예상 시장 가치</span>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#f59e0b' }}>{marketValue}원/개</span>
              </div>
              <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', color: '#374151' }}>
                  종합 의견: 이 사과는 최적의 숙성도와 우수한 품질을 보여주고 있어 {getQualityGrade(qualityScore)} 판매가 가능합니다. 색상 분포와 크기가 이상적이며, 즉시 수확하여 유통하는 것을 추천합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default App;