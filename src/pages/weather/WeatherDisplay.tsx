import React, { useState, useEffect } from "react";
import { fetchWeather, WeatherResponse } from "../../api/weatherApi.ts";
import clearIcon from "../../../public/assets/images/clear.png";
import cloudyIcon from "../../../public/assets/images/cloudy.png";
import overcastIcon from "../../../public/assets/images/overcast.png";

const WeatherDisplay: React.FC = () => {
    const style = document.createElement("style");
    style.innerHTML = `
            @font-face {
                font-family: 'Gyeonggi_Title_Medium';
                src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2410-3@1.0/Title_Medium.woff') format('woff');
                font-weight: 500;
                font-style: normal;
            }
            @font-face {
                font-family: 'GowunDodum-Regular';
                src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunDodum-Regular.woff') format('woff');
                font-weight: normal;
                font-style: normal;
            }`;
    document.head.appendChild(style);
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<{ lat: number | null, lon: number | null }>({ lat: null, lon: null });

    useEffect(() => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
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
        if (location.lat !== null && location.lon !== null) {
            setLoading(true);
            fetchWeather(location.lat, location.lon, "0200")
                .then((data: WeatherResponse) => {
                    setWeatherData(data);
                    setError(null);
                    setLoading(false);
                })
                .catch((error) => {
                    setError("날씨 정보를 가져오는 중 오류 발생");
                    setWeatherData(null);
                    console.error("❌ 오류:", error);
                    setLoading(false);
                });
        }
    }, [location]);

    const getWeatherIcon = (skyStatus: string | number) => {
        const status = Number(skyStatus);
        switch (status) {
            case 1:
                return clearIcon;
            case 3:
                return cloudyIcon;
            case 4:
                return overcastIcon;
            default:
                return clearIcon;
        }
    };

    const formatDate = (dateString: string) => {
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);
        return `${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
    };

    if (loading) return <p>🌎 위치 정보를 가져오는 중...</p>;
    if (error) return <p>❌ {error}</p>;
    if (!weatherData) return <p>📭 날씨 정보가 없습니다.</p>;

    const today = Object.entries(weatherData)[0]; // 오늘 날짜 데이터
    const todayWeather = today[1] as Record<string, any>;
    const upcomingDays = Object.entries(weatherData).slice(1, 5); // 앞으로 4일간의 데이터

    return (
        <div
            className="bg-white p-4 rounded-lg shadow-lg w-[35%] h-[420px] flex flex-col justify-between text-center border border-gray-300" style={{ fontFamily: "GowunDodum-Regular" }}>
            {/* 상단 카드 */}
            <div className="flex flex-col bg-gray-100 p-4 rounded-lg transition duration-300 hover:bg-blue-100">
                <div className="flex items-center justify-between">
                    <img src={getWeatherIcon(todayWeather["기타 정보"]["하늘상태"])} alt="Weather Icon" className="w-20 h-20"/>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">{todayWeather?.["기타 정보"]["오늘 기온"] ?? "N/A"}°C</h2>
                        <p className="text-md">최고: {todayWeather?.["일 최고기온"] ?? "N/A"}°C /
                            최저: {todayWeather?.["일 최저기온"] ?? "N/A"}°C</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-lg font-semibold">{formatDate(today[0])}</h2>
                    </div>
                </div>
                {/* 상단 카드의 하단 정보 */}
                <div className="flex justify-center gap-4 mt-3 text-xs">
                    <p>💨 {todayWeather["기타 정보"]?.["풍속"]} m/s</p>
                    <p>☔ {todayWeather["기타 정보"]?.["강수 확률"]}%</p>
                    <p>💧 {todayWeather["기타 정보"]?.["습도"]}%</p>
                </div>
            </div>
            {/* 앞으로 4일간의 날씨 */}
            <div className="grid grid-cols-4 gap-2 mt-4">
                {upcomingDays.map(([date, details]) => {
                    const weatherDetails = details as Record<string, any>;
                    const skyStatus = Number(weatherDetails["기타 정보"]?.["하늘상태"] ?? 1);
                    return (
                        <div key={date}
                             className="bg-gray-100 p-3 rounded-lg text-center transition duration-300 hover:bg-blue-100">
                            <h1 className="text-md font-semibold">{formatDate(date)}</h1>
                            <img src={getWeatherIcon(skyStatus)} alt="Weather Icon" className="w-12 h-12 mx-auto my-1"/>
                            <p className="text-md font-bold">{weatherDetails?.["기타 정보"]["오늘 기온"] ?? "N/A"}°C</p>
                            <p className="text-xs">💨 {weatherDetails["기타 정보"]?.["풍속"]} m/s</p>
                            <p className="text-xs">☔ {weatherDetails["기타 정보"]?.["강수 확률"]}%</p>
                            <p className="text-xs">💧 {weatherDetails["기타 정보"]?.["습도"]}%</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WeatherDisplay;
