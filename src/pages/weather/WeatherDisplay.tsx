import React, { useState, useEffect } from "react";
import { fetchWeather, WeatherResponse } from "../../api/weatherApi.ts";

const WeatherDisplay: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [lat, setLat] = useState<number | null>(null);
    const [lon, setLon] = useState<number | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude);
                    setLon(position.coords.longitude);
                },
                (error: GeolocationPositionError) => {
                    console.error("❌ 위치 정보를 가져올 수 없습니다:", error.message);
                    setError("위치 정보를 가져올 수 없습니다.");
                    setLoading(false);
                }
            );
        } else {
            setError("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (lat !== null && lon !== null) {
            setLoading(true);
            fetchWeather(lat, lon, "0500")
                .then((data: WeatherResponse) => { // ✅ 명확한 타입 지정
                    setWeatherData(data);
                    setLoading(false);
                })
                .catch((error: unknown) => { // ✅ error 타입 명시
                    setError("날씨 정보를 가져오는 중 오류 발생");
                    console.error("❌ 오류:", error);
                    setLoading(false);
                });
        }
    }, [lat, lon]);

    if (loading) return <p>🌎 위치 정보를 가져오는 중...</p>;
    if (error) return <p>❌ {error}</p>;
    if (!weatherData) return <p>데이터가 없습니다.</p>;

    return (
        <div>
            <h2>📅 5일간의 일별 날씨 정보</h2>
            <table border={1} cellPadding={10}>
                <thead>
                <tr>
                    <th>날짜</th>
                    <th>일 최저기온 (°C)</th>
                    <th>일 최고기온 (°C)</th>
                    <th>풍속 (m/s)</th>
                    <th>하늘상태</th>
                    <th>강수 확률 (%)</th>
                    <th>습도 (%)</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(weatherData).map(([date, details]) => {
                    const weatherDetails = details as WeatherResponse[string]; // ✅ 타입 단언 적용
                    return (
                        <tr key={date}>
                            <td>{date}</td>
                            <td>{weatherDetails["일 최저기온"] || "N/A"}</td>
                            <td>{weatherDetails["일 최고기온"] || "N/A"}</td>
                            <td>{weatherDetails["기타 정보"]?.["풍속"] || "N/A"}</td>
                            <td>{weatherDetails["기타 정보"]?.["하늘상태"] || "N/A"}</td>
                            <td>{weatherDetails["기타 정보"]?.["강수 확률"] || "N/A"}</td>
                            <td>{weatherDetails["기타 정보"]?.["습도"] || "N/A"}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default WeatherDisplay;
