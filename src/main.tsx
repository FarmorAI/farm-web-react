
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import WeatherDisplay from "./pages/weather/WeatherDisplay.tsx";
import InfoDisplay from "./pages/InfoDisplay.tsx";


createRoot(document.getElementById('root')!).render(
  <>
  <Provider store={store}>
    <App />
    <WeatherDisplay />
    <InfoDisplay query="농업" />
  </Provider>
  </>,
)
