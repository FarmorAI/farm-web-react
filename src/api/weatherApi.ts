export const API_BASE_URL = `${import.meta.env.VITE_SPRING_API_URL}/api/weather`;

export interface WeatherResponse {
    [date: string]: {
        "일 최저기온"?: number;
        "일 최고기온"?: number;
        "기타 정보"?: {
            "오늘 기온"?: number;
            "풍속"?: number;
            "하늘상태"?: number;
            "강수 확률"?: number;
            "습도"?: number;
        };
    };
}

/**
 * 🌤️ 날씨 정보를 불러오는 함수
 * @param lat 위도
 * @param lon 경도
 * @param baseTime 기준 시간
 * @returns 날씨 데이터 (`Promise<WeatherResponse>`)
 */
export const fetchWeather = async (lat: number, lon: number, baseTime: string): Promise<WeatherResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}?lat=${lat}&lon=${lon}&baseTime=${baseTime}`);

        if (!response.ok) {
            throw new Error(`❌ API 요청 실패: ${response.status}`);
        }

        const data: WeatherResponse = await response.json();
        console.log("✅ 날씨 정보:", data);
        return data; // ✅ 데이터를 반환하도록 수정
    } catch (error) {
        console.error("❌ 날씨 정보를 불러오는 중 오류 발생:", error);
        throw error; // ✅ 오류 발생 시 예외 던지기
    }
};
