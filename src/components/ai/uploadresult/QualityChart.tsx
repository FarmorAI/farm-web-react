{/*(품질 등급 - 레이더 차트) */}

import React, { useEffect } from "react";
import * as echarts from "echarts";

const QualityChart: React.FC = () => {
  useEffect(() => {
    const chart = echarts.init(document.getElementById("qualityChart")!);
    chart.setOption({
      radar: {
        indicator: [
          { name: "색상 균일성", max: 100 },
          { name: "크기", max: 100 },
          { name: "결함 없음", max: 100 }
        ]
      },
      series: [{
        type: "radar",
        data: [{ value: [90, 80, 100], name: "품질" }],
        areaStyle: { color: "#FF5A5F" }
      }]
    });

    return () => chart.dispose();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">품질 등급</h3>
      <div id="qualityChart" className="h-64"></div>
      <p className="text-center text-gray-600 mt-2">A급 (색상 90% 균일, 결함 없음)</p>
      <p className="text-center text-xs text-gray-400 mt-1">사진 기반 추정</p>
    </div>
  );
};

export default QualityChart;
