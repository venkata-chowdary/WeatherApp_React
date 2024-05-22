import React, { useEffect, useState } from "react";

import axios from 'axios';


function App() {

    const d=new Date()
    const [location, setLocation] = useState('')
    const [weatherData, setWeatherData] = useState(null)
    const [errorMsg,setError]=useState(null)
    const [time,setTime]=useState(new Date())
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    const apiKey = 'c5d84120d5b37b9d83a3acff53cc9b18'

    useEffect(()=>{
        setInterval(()=>setTime(new Date()),1000)
    },[])
    useEffect(() => {
        axios.post(`https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=${apiKey}&units=imperial`)
            .then((response) => {
                setWeatherData(response.data)
                setError(null)
            })
            .catch((err) => console.log(err))
    }, [])

    function sendData(e) {
        e.preventDefault()
        axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`)
            .then((response) => {
                console.log(response)
                setWeatherData(response.data)
                setError(null)
            })
            .catch((err) => {
                setError(err.response.data.message)
                console.log(errorMsg)
                setWeatherData(null)
            })
    }

    return (
        <div className="app">
            <form className="search" onSubmit={sendData}>
                <input type="text" placeholder="Enter Location" onChange={e => setLocation(e.target.value)} />
                {/* <button type="submit" className="search-button">
                    <FontAwesomeIcon icon={faSearch} />
                </button> */}
            </form>

            {errorMsg && <p className="error-msg">{errorMsg}</p>}
            {weatherData &&
                <div className="container">
                    <div className="child1">
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
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
                                <h4>{time.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}, {weekday[d.getDay()]}</h4>
                            </div>
                            <div className="weather-desc">
                                <h4>Mostly Sunny</h4>
                                <h4>Feels like: {((weatherData.main.temp - 32) * 5 / 9).toFixed(1)} °C</h4>
                            </div>
                        </div>

                    </div>

                </div>
            }

            <p className="developer">Developed by <span style={{fontWeight:600}}>Venkata Chowdary</span></p>
        </div>
    );
}

export default App;
