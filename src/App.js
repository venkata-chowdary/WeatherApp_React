import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


function App() {


  const [location,setLocation]=useState('')
  const [data,setData]=useState({})



  function sendData(e){
    e.preventDefault()
    axios.post('https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=c5d84120d5b37b9d83a3acff53cc9b18')
    .then((data)=>{
      console.log(data.data)
    })
    .catch((err)=>console.log(err))
  }
    return (
        <div className="app">
            <form className="search" onSubmit={sendData}>
                <input type="text" placeholder="Enter Location" onChange={e=>setLocation(e.target.value)}/>
                <button type="submit" className="search-button">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>

            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>Visakhapatnam</p>
                    </div>

                    <div className="temp">
                        <h1>39</h1>
                    </div>

                    <div className="description">
                      <p>cloudy outisde</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
