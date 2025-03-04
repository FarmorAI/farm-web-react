import WeatherDisplay from "./weather/WeatherDisplay";
import InfoDisplay from "./InfoDisplay";

const Main = () => {
    return (
        <div>
            <WeatherDisplay />
            <InfoDisplay query="농업" />
        </div>
    );
};

export default Main;
