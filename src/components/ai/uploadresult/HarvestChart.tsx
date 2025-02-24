{/*(수확 시기 예측 - 라인 차트)*/}

import React, { useEffect } from "react";
import * as echarts from "echarts";

const HarvestChart: React.FC = () => {
  useEffect(() => {
    const chart = echarts.init(document.getElementById("harvestChart")!);
    chart.setOption({
      xAxis: { type: "category", data: ["1월", "2월", "3월"] },
      yAxis: { type: "value", max: 100 },
      series: [{
        type: "line",
        data: [20, 50, 70],
        smooth: true,
        lineStyle: { color: "#FF5A5F" },
        areaStyle: { color: "rgba(255, 90, 95, 0.2)" }
      }]
    });

    return () => chart.dispose();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">수확 시기 예측</h3>
      <div id="harvestChart" className="h-64"></div>
      <p className="text-center text-gray-600 mt-2">약 10일 후 최적 수확 시기 (3월 15일)</p>
      <p className="text-center text-xs text-gray-400 mt-1">사진 기반 추정</p>
    </div>
  );
};

export default HarvestChart;
