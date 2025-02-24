{/*(건강 상태 - 도넛 차트) */}


import React, { useEffect } from "react";
import * as echarts from "echarts";

const HealthChart: React.FC = () => {
  useEffect(() => {
    const chart = echarts.init(document.getElementById("healthChart")!);
    chart.setOption({
      series: [{
        type: "pie",
        radius: ["40%", "70%"],
        data: [
          { value: 75, name: "양호" },
          { value: 15, name: "보통" },
          { value: 10, name: "위험" }
        ],
        color: ["#FF5A5F", "#FFB3B3", "#FFD9D9"],
        label: { show: true, position: "outside" }
      }]
    });

    return () => chart.dispose();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">건강 상태</h3>
      <div id="healthChart" className="h-64"></div>
      <p className="text-center text-gray-600 mt-2">잎: 건강 | 표면: 작은 반점 (초기 곰팡이병 가능성 60%)</p>
      <p className="text-center text-xs text-gray-400 mt-1">사진 기반 추정</p>
    </div>
  );
};

export default HealthChart;
