import { BarChart } from "./BarChart";
import ChartJsExample from "./ChartJsExample";
import { DoughnutChart } from "./DoughnutChart";
import RechartsExample from "./RechartsExample";

const Chart = () => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", height: "100vh", alignItems: "start" }}>
      {/* 1구간: 라인 차트 2개 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ChartJsExample />
        <RechartsExample />
      </div>

      {/* 2구간: Bar Chart (위치 상단 조정) */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <BarChart />
      </div>

      {/* 3구간: Doughnut Chart (위치 상단 조정) */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <DoughnutChart />
      </div>
    </div>
  );
};

export default Chart;
