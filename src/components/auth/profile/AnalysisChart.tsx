import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const AnalysisChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["총 분석건수", "이번 달 분석", "평균 정확도"],
            datasets: [
              {
                label: "분석 통계",
                data: [315, 37, 98],
                backgroundColor: [
                  "rgba(99, 102, 241, 0.6)",
                  "rgba(79, 70, 229, 0.6)",
                  "rgba(59, 130, 246, 0.6)",
                ],
                borderColor: [
                  "rgba(99, 102, 241, 1)",
                  "rgba(79, 70, 229, 1)",
                  "rgba(59, 130, 246, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: { beginAtZero: true },
            },
          },
        });
      }
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 card-hover">
      <h2 className="text-lg font-medium mb-4">분석 통계</h2>
      <canvas id="analysisChart" ref={chartRef} className="mt-4"></canvas>
    </div>
  );
};

export default AnalysisChart;
