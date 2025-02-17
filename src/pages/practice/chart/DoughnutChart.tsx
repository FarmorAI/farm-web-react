import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

// 차트 옵션 (TypeScript 오류 해결)
export const options: ChartOptions<"doughnut"> = {
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      color: "black",
      font: {size: 10,
        weight: "bold", // 🔥 as "bold" 제거
      },
      formatter: (value: number) => `${value}%`, // 값 뒤에 % 붙이기
    },
  },
};
  

export const data = {
  labels: ["짜장면", "치킨", "곱창", "피자", "족발", "한강라면"],
  datasets: [
    {
      label: "지금 가장 먹고 싶은 음식",
      data: [10, 80, 30, 20, 70, 60],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
      borderColor: "gray",
      borderWidth: 1,
    },
  ],
};

// 컴포넌트 정의
export const DoughnutChart: React.FC = () => {
  return (
    <div style={{ width: "300px", height: "300px", margin: "0 auto" }}>
      <Doughnut options={options} data={data} />
    </div>
  );
};
