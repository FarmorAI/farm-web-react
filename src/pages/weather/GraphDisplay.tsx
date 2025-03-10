import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { fetchDistributionData } from "../../api/graphApi";

// ✅ 데이터 타입 정의
interface DistributionData {
    grade: number;
    mu: number;
    std: number;
    x: number[];
    y: number[];
}

// ✅ 등급별 색상 및 이름 매핑
const gradeColors: Record<number, string> = {
    0: "blue",   // 보통
    1: "orange", // 상
    2: "green",  // 특
};

const gradeLabels: Record<number, string> = {
    0: "보통",
    1: "상",
    2: "특",
};

const GraphDisplay: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [baselineValue, setBaselineValue] = useState<number>(0);

    useEffect(() => {
        fetchDistributionData().then((fetchedData: DistributionData[]) => {
            // ✅ 데이터 변환
            const formattedData = fetchedData.map((item) => ({
                id: gradeLabels[item.grade] || `등급 ${item.grade}`,
                color: gradeColors[item.grade] || "gray",
                data: item.x.map((xValue, index) => ({
                    x: xValue,
                    y: item.y[index],
                })),
            }));

            setData(formattedData);

            // ✅ areaBaselineValue 설정 (데이터에서 최소 y 값 찾기)
            const minY = Math.min(...fetchedData.flatMap((item) => item.y));
            setBaselineValue(minY);
        });
    }, []);

    // ✅ Nivo theme 설정 (글씨체 적용)
    const customTheme = {
        axis: {
            ticks: {
                text: {
                    fontSize: 12,
                    fontFamily: "GowunDodum-Regular",
                    fill: "#333",
                },
            },
            legend: {
                text: {
                    fontSize: 14,
                    fontFamily: "GowunDodum-Regular",
                    fill: "#111",
                },
            },
        },
        legends: {
            text: {
                fontSize: 12,
                fontFamily: "GowunDodum-Regular",
                fill: "#444",
            },
        },
        tooltip: {
            container: {
                fontSize: 12,
                fontFamily: "GowunDodum-Regular",
            },
        },
    };

    return (
        <div style={{ height: 450, width: 700, margin: "auto" }}>
            <h2
                style={{
                    fontFamily: "Gyeonggi_Title_Medium",
                    fontSize: "22px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                    textAlign: "center",
                }}
            >
                🍎&nbsp;등급별 사과 무게 분포&nbsp;🍎
            </h2>
            <ResponsiveLine
                data={data}
                theme={customTheme} // ✅ 글씨체 적용
                margin={{ top: 40, right: 50, bottom: 50, left: 70 }}
                xScale={{ type: "linear", min: 175 }}
                yScale={{ type: "linear", min: "auto" }}
                axisBottom={{
                    legend: "무게 (g)",
                    legendPosition: "middle",
                    legendOffset: 40,
                }}
                axisLeft={{
                    legend: "확률 밀도",
                    legendPosition: "middle",
                    legendOffset: -55,
                }}
                colors={(d) => d.color as string}
                pointSize={5}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                useMesh={true}
                enableArea={true}
                areaBaselineValue={baselineValue}
                areaOpacity={0.3}
                tooltip={({ point }) => (
                    <div
                        style={{
                            background: "white",
                            padding: "5px",
                            border: "1px solid #ccc",
                        }}
                    >
                        <strong>{point.serieId}</strong> <br />
                        무게: {Number(point.data.x).toFixed(2)}g <br />
                        확률 밀도: {Number(point.data.y).toFixed(2)}
                    </div>
                )}
                legends={[
                    {
                        anchor: "top-right",
                        direction: "column",
                        translateX: 60,
                        translateY: 0,
                        itemsSpacing: 4,
                        itemWidth: 80,
                        itemHeight: 20,
                        itemDirection: "left-to-right",
                        itemOpacity: 0.8,
                        symbolSize: 12,
                        symbolShape: "circle",
                        symbolBorderColor: "rgba(0, 0, 0, .5)",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemBackground: "rgba(0, 0, 0, .03)",
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};

export default GraphDisplay;
