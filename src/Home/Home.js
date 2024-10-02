import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import clear from "../Assets/images/clear.png";
import rain from "../Assets/images/rain.png";
import snow from "../Assets/images/snow.png";
import clouds from "../Assets/images/cloud.png";
import mist from "../Assets/images/mist.png";
import haze from "../Assets/images/haze.png";
import smoke from "../Assets/images/smoke.png";
import { Link } from "react-router-dom";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [weatherImg, setWeatherImg] = useState();
  const [backgroundColor, setBackgroundColor] = useState({});

  let allWeather = [];
  let weather = localStorage.getItem("weather");
  if (weather !== null) {
    allWeather = JSON.parse(weather);
  }

  const searchCity = async () => {
    const date = new Date();
    const getDate = date.toDateString();
    const getTime = date.toLocaleTimeString();
    try {
      const respone = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${inputValue}&appid=f2bf8ca0636aba5e7b0b2ce55bfa486b`
      );
      const data = await respone.json();
      setWeatherData(data);
      console.log(data);
      if (data.cod === "404") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Oops! City not found. Please check the city name."
        });
      }
      allWeather.push({
        date: getDate,
        time: getTime,
        city: data.name,
        temp: `${Math.floor(data.main.temp)}°`,
      });
      if (data.weather[0].main == "Clear") {
        setBackgroundColor({
          backgroundColor: "#ADD8E6",
        });
        setWeatherImg(clear);
      } else if (data.weather[0].main == "Rain") {
        setBackgroundColor({
          backgroundColor: "#A9A9A9",
        });
        setWeatherImg(rain);
      } else if (data.weather[0].main == "Snow") {
        setBackgroundColor({
          backgroundColor: "#FFFAFA",
        });
        setWeatherImg(snow);
      } else if (data.weather[0].main == "Clouds") {
        setBackgroundColor({
          backgroundColor: " #B0C4DE",
        });
        setWeatherImg(clouds);
      } else if (data.weather[0].main == "Mist") {
        setBackgroundColor({
          backgroundColor: " #E0FFFF",
        });
        setWeatherImg(mist);
      } else if (data.weather[0].main == "Haze") {
        setBackgroundColor({
          backgroundColor: "#e0e0e0",
        });
        setWeatherImg(haze);
      } else if (data.weather[0].main == "Smoke") {
        setBackgroundColor({
          backgroundColor: "#f5f5f5",
        });
        setWeatherImg(smoke);
      }
      localStorage.setItem("weather", JSON.stringify(allWeather));
    } catch (error) {
      console.log("Error", error);
    }
    setInputValue("");
  };

  //   useEffect(() => {
  //     searchCity();
  //   }, []);

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6">Weather App </h1>

      {/* Search Bar */}
      {/* <div className="flex items-center space-x-2 w-full max-w-lg mb-6">
        <form onSubmit={(e) => searchCity(e.preventDefault())}>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder="Enter Your Location"
            className="w-full p-3 rounded-l-lg shadow-md outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-r-lg shadow-md">
            🔍
          </button>
        </form>
      </div> */}

      <div className="flex justify-center items-center w-full max-w-lg mb-6 ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchCity();
          }}
          className="flex w-full"
        >
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder="Enter Your Location"
            className="w-full p-3 rounded-l-lg shadow-md outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-3 bg-gray-100 focus:ring-2 focus:ring-blue-500 hover:bg-gray-200 rounded-r-lg shadow-md"
          >
            🔍
          </button>
        </form>
      </div>

      {typeof weatherData.main !== "undefined" ? (
        // <div><h1>Hello</h1></div>
        <>
          {/* 🌤️ */}
          <div className="flex flex-col items-center mb-6">
            {/* <div className="text-6xl">{weatherImg}</div> */}
            <img className="text-6xl w-32" src={weatherImg} alt="" />
            <h2 className="text-2xl font-semibold my-4">{weatherData.name}</h2>
            {/* <p className="text-2xl"></p> */}
            <p className="text-6xl font-bold">
              {Math.floor(weatherData.main.temp)}°C
            </p>
          </div>

          <div className="flex justify-around w-full max-w-lg">
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold">Humidity</span>
              <span className="text-lg">{weatherData.main.humidity}%</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold">Wind Speed</span>
              <span className="text-lg">
                {Math.floor(weatherData.wind.speed)}Km/H
              </span>
            </div>
          </div>

          <div className="mt-8">
            <Link to={"/weatherhistory"}>
              <button className="bg-gray-200 p-3 rounded-lg hover:bg-gray-300">
                Weather History 📜
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center mb-6">
            <div className="text-6xl">🌤️</div>
            <h2 className="text-2xl font-semibold my-4">
              Check Current Weather
            </h2>
            <p className="text-6xl font-bold">00°C</p>
          </div>

          <div className="flex justify-around w-full max-w-lg">
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold">Humidity</span>
              <span className="text-lg">%</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold">Wind Speed</span>
              <span className="text-lg">Km/H</span>
            </div>
          </div>

          <div className="mt-8">
            <Link to={"/weatherhistory"}>
              <button className="bg-gray-200 p-3 rounded-lg hover:bg-gray-300">
                Weather History 📜
              </button>
            </Link>
          </div>
        </>
      )}
      {/* <div className="flex flex-col items-center mb-6">
        <div className="text-6xl">🌤️</div>
        <h2 className="text-2xl font-semibold my-4">Check Current Weather</h2>
        <p className="text-6xl font-bold">{Math.round(weatherData?.main?.temp)}00°C</p>
      </div>

      <div className="flex justify-around w-full max-w-lg">
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">Humidity</span>
          <span className="text-lg">%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">Wind Speed</span>
          <span className="text-lg">Km/H</span>
        </div>
      </div>

      <div className="mt-8">
        <button className="bg-gray-200 p-3 rounded-lg hover:bg-gray-300">
          Weather History 📜
        </button>
      </div> */}
    </div>
  );
}

export default Home;

{
  /* <div>
<div className="flex justify-center p-5">
  <form onSubmit={(e) => searchCity(e.preventDefault())}>
    <h1 className="text-4xl p-5">Weather App</h1>
    <input
      type="text"
      className="shadow-lg shadow-gray-300 w-80 border-black p-2 "
      onChange={(e) => setInputValue(e.target.value)}
      value={inputValue}
      required
      placeholder="Enter Your Location"
    />
    <button type="submit">Submit</button>
  </form>
</div>
<div>
  {typeof weatherData.main !== "undefined" ? (
      <div>
          <img width={'100px'} src={weatherImg} alt="" />
          <h1>{weatherData.name}</h1>

          <h4> {weatherData.main.temp}°C</h4>    
      </div>
  ) : (
      <div>
          
      </div>
  )} */
}

{
  /* <p>Temperature</p> */
}
{
  /* <h1>{weatherData.main.temp}</h1> */
}
{
  /* </div> */
}
{
  /* </div> */
}
