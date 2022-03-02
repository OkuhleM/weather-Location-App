import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


function App() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [returnWeather, setReturnWeather] = useState("");
  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [townName, setTownName] = useState("");


  const location = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  const fetchWeather = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(location);
      const weatherResult = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c5473350a18e65054f9bff3de891753b&units=metric`
      );
      setTownName(weatherResult.data.name)
      setCurrentTemperature(weatherResult.data.main.temp);
      setReturnWeather(weatherResult.data.weather[0].main)
      console.log('weatherResult', weatherResult.data);

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude])

  return (
    <div className="App">
<p>Your Town Name will appear here:</p>
<br/>
      <span>{townName}</span>
      <h2>{currentTemperature} &#8451;</h2>
      <p>{returnWeather}</p>

    </div>
  );
}

export default App;
