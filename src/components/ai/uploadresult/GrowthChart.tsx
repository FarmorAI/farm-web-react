{/*(생육 상태 - 리퀴드 필 차트) */}

import React, { useEffect } from "react";
import * as echarts from "echarts";
import "echarts-liquidfill";

const GrowthChart: React.FC = () => {
  useEffect(() => {
    const chart = echarts.init(document.getElementById("growthChartOverlay")!);
    chart.setOption({
      series: [{
        type: "liquidFill",
        data: [0.7],
        radius: "90%",
        color: ["#FF5A5F"],
        backgroundStyle: { color: "transparent" },
        outline: { show: false },
        label: { fontSize: 24, color: "#FF5A5F", formatter: "숙성도\n{value|70%}", position: "center" }
      }]
    });

    return () => chart.dispose();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8 relative">
      <h3 className="text-lg font-medium text-gray-900 mb-4">생육 상태</h3>
      <div id="growthChart" className="h-64 relative">
        <div id="growthChartOverlay" className="h-full w-full"></div>
      </div>
      <p className="text-center text-gray-600 mt-2">크기: 중간 | 색상: 70% 빨강 | 형태: 균일</p>
      <p className="text-center text-xs text-gray-400 mt-1">사진 기반 추정</p>
    </div>
  );
};

export default GrowthChart;
