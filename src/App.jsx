import React, { useEffect, useState } from "react";
import wind from "./assets/wind.png";
import hum from "./assets/hum.png";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FaCloudSun } from "react-icons/fa6";
import { FaFaceFrown } from "react-icons/fa6";

function Weather({ city, country, temp, humidity, windlevel }) {
  return (
    <div className="wrapper">
      <div id="align">
        <h1>{city}</h1>
        <h2>{country}</h2>
        <h1>
          {temp}
           <sup> o</sup>C
        </h1>
      </div>
      <div id="imgflex">
        <div className="wind">
          <img className="windimg" src={wind} />
          <h5>Wind : {windlevel}km/hr</h5>
        </div>
        <div className="wind">
          <img className="windimg" src={hum} />
          <h5>Humidity : {humidity} %</h5>
        </div>
      </div>
    </div>
  );
}

function Notfound(){
  return(
    <div id="notfound">
      <h1>City not found <FaFaceFrown /></h1>
      <h2>Kindly check the spelling!!!</h2>
    </div>
  )
}

function App() {
  const [value, setValue] = useState("chennai");
  const [cityNotFound, setCityNotFound] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windlevel, setWindlevel] = useState("");
  function handleChange(e) {
    setValue(e.target.value);
  }
  async function apiFetch() {
    try {
      let place = value;
      let api = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=df4aa7f630c6779d8b6a1be60427e060&units=metric`
      );
       let data = api.json();
      data.then((res) => {
        if (res.cod === "404") {
          setCityNotFound(true);
          return;
        } else {
          setCityNotFound(false)
          setCity(res.name);
          setCountry(res.sys.country);
          setTemp(res.main.temp);
          setHumidity(res.main.humidity);
          setWindlevel(res.wind.speed);
        }
      }).catch((err)=>{
        console.log(err)
      })
    } catch (error) {
      console.log(error);
    }
  }
  function enterSearch(e){
    if(e.key == "Enter"){
      apiFetch();
    }
  }
  useEffect(() => {
    apiFetch();
  }, []);
  return (
    <div className="body">
    <div className="container">
      <div id="search">
        <input
          type="text"
          value={value}
          onKeyDown={enterSearch}
          onChange={handleChange}
          placeholder="Enter city"
        />
        <FaSearch id="searchicon" onClick={apiFetch} />
      </div>
      {cityNotFound ? <div>
        <Notfound id="notfound" />
      </div>
        
       : 
        <div>
          <div id="sun">
            <FaCloudSun id="sunicon" />
          </div>
          <Weather
            city={city}
            country={country}
            temp={temp}
            humidity={humidity}
            windlevel={windlevel}
          />
        </div>
      }
     
    </div>
    <div className="copyRight"><p>&#169; Copy right reserved by Rajesh</p></div>
    </div>
    
  );
}

export default App;
