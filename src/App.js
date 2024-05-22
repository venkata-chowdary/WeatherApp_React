import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


function App() {


    const [location, setLocation] = useState('')
    const [weatherData, setWeatherData] = useState({})
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const d = new Date();


    const apiKey = 'c5d84120d5b37b9d83a3acff53cc9b18'


    useEffect(() => {
        axios.post(`https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=${apiKey}&units=imperial`)
            .then((response) => {
                setWeatherData(response.data)
                console.log(response)
            })
            .catch((err) => console.log(err))
    }, [])

    function sendData(e) {
        e.preventDefault()
        axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`)
            .then((response) => {
                setWeatherData(response.data)
            })
            .catch((err) => console.log(err))
    }

    console.log(weatherData)
    return (
        <div className="app">
            <form className="search" onSubmit={sendData}>
                <input type="text" placeholder="Enter Location" onChange={e => setLocation(e.target.value)} />
                <button type="submit" className="search-button">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
            

            <div className="container">
                <div className="child1">
                    <img src="https://openweathermap.org/img/wn/10d@2x.png" />
                    <h1>{((weatherData.main.temp - 32) * 5 / 9).toFixed(1)} °C</h1>
                </div>
                <div className="child2">
                    <div className="other-details-1">
                        <h2>{weatherData.name}</h2>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Wind: {weatherData.wind.speed} km/h </p>
                    </div>
                    <div className="other-details-2">
                        <div className="time-day">
                            <h4>12:00 PM, {weekday[d.getDay()]}</h4>
                        </div>
                        <div className="weather-desc">
                            <h4>Mostly Sunny</h4>
                            <h4>Feels like:</h4>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default App;
