import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "2017",
    react: 32,
    angular: 37,
    vue: 60,
  },
  {
    name: "2018",
    react: 42,
    angular: 42,
    vue: 54,
  },
  {
    name: "2019",
    react: 51,
    angular: 41,
    vue: 54,
  },
  {
    name: "2020",
    react: 60,
    angular: 37,
    vue: 28,
  },
  {
    name: "2021",
    react: 51,
    angular: 31,
    vue: 27,
  },
  {
    name: "2022",
    react: 95,
    angular: 44,
    vue: 49,
  },
  {
    name: "2023",
    react: 97,
    angular: 42,
    vue: 52,
  },
];

const RechartsExample = () => {
  return (
    <>
      <h1>RechartsExample</h1>
      <LineChart width={600} height={300} data={data}>
        <Line type="linear" dataKey="react" stroke="#0CD3FF" strokeWidth={3} />
        <Line
          type="monotone"
          dataKey="angular"
          stroke="#a6120d"
          strokeWidth={3}
        />
        <Line type="natural" dataKey="vue" stroke="#FFCA29" strokeWidth={3} />
        <CartesianGrid stroke="#ccc" />
        <YAxis />
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
      </LineChart>
    </>
  );
};

export default RechartsExample;