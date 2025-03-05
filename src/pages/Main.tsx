import WeatherDisplay from "./weather/WeatherDisplay";
import BlogDisplay from "./weather/BlogDisplay.tsx";

const Main = () => {
    return (
        <div>
            <WeatherDisplay />
            <BlogDisplay query="농업" />
        </div>
    );
};

export default Main;
