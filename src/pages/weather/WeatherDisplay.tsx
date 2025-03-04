import React, { useState, useEffect } from "react";
import { fetchWeather, WeatherResponse } from "../../api/weatherApi.ts";
import clearIcon from "../../../public/assets/images/clear.png";
import cloudyIcon from "../../../public/assets/images/cloudy.png";
import overcastIcon from "../../../public/assets/images/overcast.png";

const WeatherDisplay: React.FC = () => {
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
        <div className="max-w-4xl mx-auto p-6 bg-indigo-200 text-gray-900 rounded-lg">
            {/* 상단 카드 */}
            <div className="flex flex-col bg-indigo-100 p-6 rounded-lg transition duration-300 hover:bg-blue-400">
                <div className="flex items-center justify-between">
                    <img src={getWeatherIcon(todayWeather["기타 정보"]["하늘상태"])} alt="Weather Icon" className="w-24 h-24" />
                    <div className="text-center">
                        <h2 className="text-5xl font-bold">{todayWeather?.["기타 정보"]["오늘 기온"] ?? "N/A"}°C</h2>
                        <p className="text-lg">최고: {todayWeather?.["일 최고기온"] ?? "N/A"}°C / 최저: {todayWeather?.["일 최저기온"] ?? "N/A"}°C</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-semibold">{formatDate(today[0])}</h2>
                    </div>
                </div>
                {/* 상단 카드의 하단 정보 */}
                <div className="flex justify-center gap-6 mt-4 text-sm">
                    <p>💨 풍속: {todayWeather["기타 정보"]?.["풍속"]} m/s</p>
                    <p>☔ 강수확률: {todayWeather["기타 정보"]?.["강수 확률"]}%</p>
                    <p>💧 습도: {todayWeather["기타 정보"]?.["습도"]}%</p>
                </div>
            </div>
            {/* 앞으로 4일간의 날씨 */}
            <div className="grid grid-cols-4 gap-4 mt-6">
                {upcomingDays.map(([date, details]) => {
                    const weatherDetails = details as Record<string, any>;
                    const skyStatus = Number(weatherDetails["기타 정보"]?.["하늘상태"] ?? 1);
                    return (
                        <div key={date} className="bg-indigo-100 p-4 rounded-lg text-center transition duration-300 hover:bg-blue-400">
                            <h1 className="text-lg font-semibold">{formatDate(date)}</h1>
                            <img src={getWeatherIcon(skyStatus)} alt="Weather Icon" className="w-16 h-16 mx-auto my-2" />
                            <p className="text-xl font-bold">{weatherDetails?.["기타 정보"]["오늘 기온"] ?? "N/A"}°C</p>
                            <p className="text-sm">💨 풍속: {weatherDetails["기타 정보"]?.["풍속"]} m/s</p>
                            <p className="text-sm">☔ 강수확률: {weatherDetails["기타 정보"]?.["강수 확률"]}%</p>
                            <p className="text-sm">💧 습도: {weatherDetails["기타 정보"]?.["습도"]}%</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WeatherDisplay;
