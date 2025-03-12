// import React, { useEffect, useState } from "react";
// import { ResponsiveLine } from "@nivo/line";
// import { fetchDistributionData } from "../../api/graphApi";

// ✅ 데이터 타입 정의
// interface DistributionData {
//     grade: number;
//     mu: number;
//     std: number;
//     x: number[];
//     y: number[];
// }
//
// // ✅ 등급별 색상 매핑
// const gradeColors: Record<number, string> = {
//     0: "blue", // 보통
//     1: "orange", // 상
//     2: "green", // 특
// };

const GraphDisplay: React.FC = () => {
    return <div>Graph Display</div>;
    // const [data, setData] = useState<any[]>([]);

    // useEffect(() => {
    //     fetchDistributionData().then((fetchedData: DistributionData[]) => {
    //         const formattedData = fetchedData.map((item) => ({
    //             id: `등급 ${item.grade}`,
    //             color: gradeColors[item.grade] || "gray",
    //             data: item.x.map((xValue, index) => ({
    //                 x: xValue,
    //                 y: item.y[index],
    //             })),
    //         }));

    //         setData(formattedData);
    //     });
    // }, []);

    // return (
    //     <div style={{ height: 500 }}>
    //         <h2>등급별 사과 무게 정규분포</h2>
    //         <ResponsiveLine
    //             data={data}
    //             margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
    //             xScale={{ type: "linear" }}
    //             yScale={{ type: "linear", min: 0 }}
    //             axisBottom={{
    //                 legend: "무게 (g)",
    //                 legendPosition: "middle",
    //                 legendOffset: 40,
    //             }}
    //             axisLeft={{
    //                 legend: "확률 밀도",
    //                 legendPosition: "middle",
    //                 legendOffset: -50,
    //             }}
    //             colors={{ datum: "color" }}
    //             pointSize={5}
    //             pointColor={{ theme: "background" }}
    //             pointBorderWidth={2}
    //             pointBorderColor={{ from: "serieColor" }}
    //             useMesh={true}
    //             tooltip={({ point }) => (
    //                 <div
    //                     style={{
    //                         background: "white",
    //                         padding: "5px",
    //                         border: "1px solid #ccc",
    //                     }}
    //                 >
    //                     <strong>{point.serieId}</strong> <br />
    //                     무게: {String(point.data.x)}g <br />
    //                     확률 밀도: {String(point.data.y)}
    //                 </div>
    //             )}
    //             legends={[
    //                 {
    //                     anchor: "top-right",
    //                     direction: "column",
    //                     justify: false,
    //                     translateX: 40,
    //                     translateY: 0,
    //                     itemsSpacing: 2,
    //                     itemDirection: "left-to-right",
    //                     itemWidth: 80,
    //                     itemHeight: 20,
    //                     itemOpacity: 0.75,
    //                     symbolSize: 12,
    //                     symbolShape: "circle",
    //                     symbolBorderColor: "rgba(0, 0, 0, .5)",
    //                     effects: [
    //                         {
    //                             on: "hover",
    //                             style: {
    //                                 itemBackground: "rgba(0, 0, 0, .03)",
    //                                 itemOpacity: 1,
    //                             },
    //                         },
    //                     ],
    //                 },
    //             ]}
    //         />
    //     </div>
    // );
};

export default GraphDisplay;
