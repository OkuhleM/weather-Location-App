import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {render} from '@testing-library/react'


function App() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [returnWeather, setReturnWeather] = useState("");
  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [townName, setTownName] = useState("");
  const [displayIcon, setDisplayIcon] = useState(null);


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
      setReturnWeather(weatherResult.data.weather[0].description)
      console.log('weatherResult', weatherResult.data);
      if(weatherResult.data.weather[0].icon !== null && weatherResult.data.weather[0].icon !== ''){
        setDisplayIcon(weatherResult.data.weather[0].icon)
      }else{
        setDisplayIcon("01d")
      }

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude])

  return (
    <div className="App">

<div className="card-container">
  <div className='results'>
      <h2>South Africa, {townName}</h2>
      <h2>{currentTemperature} &#8451;</h2><br/>
      <h2>{returnWeather}</h2><br/>
      <img src={`http://openweathermap.org/img/wn/${displayIcon}@2x.png`}/>
    </div>
      </div>
      <div className='daysOfTheWeek'>
      <p>Sunday</p>
      <p>Monday</p>
      <p>Tuesday</p>
      <p>Wednesday</p>
      <p>Thursday</p>
      <p>Friday</p>
      <p>Sartuday</p>
      </div>
    </div>
  );
}

export default App;
