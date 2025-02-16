import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["2017", "2018", "2019", "2020", "2021", "2022", "2023"];

const options : ChartOptions<"line"> = {
  responsive: true,
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true, // Y축을 0부터 시작
    },
  },
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: "React",
      data: [32, 42, 51, 60, 51, 95, 97],
      backgroundColor: "#0CD3FF",
      borderColor: "#0CD3FF",
    },
    {
      label: "Angular",
      data: [37, 42, 41, 37, 31, 44, 42],
      backgroundColor: "#a6120d",
      borderColor: "#a6120d",
    },
    {
      label: "Vue",
      data: [60, 54, 54, 28, 27, 49, 52],
      backgroundColor: "#FFCA29",
      borderColor: "#FFCA29",
    },
  ],
};

const ChartJsExample = () => {
  return (
    <div>
      <h1>Chart js</h1>
      <div style={{ width: 600, height: 300 }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default ChartJsExample;