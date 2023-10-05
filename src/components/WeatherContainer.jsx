import { useState } from "react"
import WeatherAdditionalInfo from "./WeatherAdditionalInfo"
import axios from "axios";

const WeatherContainer = ({ weather, setWeather }) => {
  const [isCelsius, setIsCelsius] = useState(true)
  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const searchCity = () => {
    let API_KEY = "1f0803b7e21d6152b057b363c6d92eb6"
    if (inputText === "") return
    else {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${API_KEY}`)
        .then(({ data }) => {
          setWeather(data)
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  const weatherDescription = weather.weather[0].description
  const weatherMain = weather.weather[0].main

  const changeUnitTemp = () => {
    setIsCelsius(!isCelsius)
  }

  return (
    <main className={`h-screen grid items-center justify-center
    ${weatherDescription === "clear sky" ? 'bg-[url("/clearSky.jpg")]' :
        weatherDescription === "few clouds" ? 'bg-[url("/fewClouds.jpg")]' :
          weatherDescription === "scattered clouds" ? 'bg-[url("/scatteredClouds.jpg")]' :
            weatherDescription === "broken clouds" ? 'bg-[url("/brokenClouds.jpg")]' :
              weatherDescription === "shower rain" ? 'bg-[url("/showerRain.jpg")]' :
                weatherDescription === "overcast clouds" ? 'bg-[url("/overcastClouds.jpg")]' :
                  weatherDescription === "mist" ? 'bg-[url("/mist.jpg")]' :
                    weatherMain === "Rain" ? 'bg-[url("/rain.jpg")]' :
                      weatherMain === "Thunderstorm" ? 'bg-[url("/thunderStorm.jpg")]' :
                        weatherMain === "Drizzle" ? 'bg-[url("/drizzle.jpg")]' :
                          weatherMain === "Smoke" ? 'bg-[url("/smoke.jpg")]' :
                          weatherMain === "Haze" ? 'bg-[url("/haze.jpg")]' :
                          weatherMain === "Dust" ? 'bg-[url("/dust.jpg")]' :
                          weatherMain === "Fog" ? 'bg-[url("/Fog.jpg")]' :
                          weatherMain === "Sand" ? 'bg-[url("/Sand.jpg")]' :
                          weatherMain === "Ash" ? 'bg-[url("/Ash.jpg")]' :
                          weatherMain === "Squall" ? 'bg-[url("/Squall.jpg")]' :
                          weatherMain === "Tornado" ? 'bg-[url("/Tornado.jpg")]' :                          
                            weatherMain === "Thunderstorm" && 'bg-[url("/thunderStorm.jpg")]'
      } bg-cover bg-center`}>


      <div className="flex items-center justify-center">
        <div className="flex border border-[#4580BA] rounded">
          <input
            type="text"
            className="block w-full px-4 py-2 text-[#4580BA] bg-white border rounded-md focus:border-blue-400 focus:ring-white focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Buscar..."
            onChangeCapture={inputHandler}
          />
          <button onClick={searchCity} className="px-3 text-white bg-blue-600 rounded ">
            <img src="/search.png" alt="search icon" />
          </button>
        </div>
      </div>


      <section className="grid text-center w-screen gap-5 px-3 justify-center">
        <h2 className="text-xl font-bold sm:text-3xl">{weather.name}, {weather.sys.country}</h2>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto] mx-auto">

          <article className="grid grid-cols-3 bg-[rgb(224,224,224)]/50 rounded-[38px] p-7 pt-4 items-center max-w-[449px] min-h-[216px] sm:h-[278px]">
            <h3 className="col-span-3 text-lg capitalize font-semibold sm:text-2xl">{weather.weather[0].description}</h3>
            {isCelsius ? <span className="col-span-2 font-light text-7xl sm:text-8xl">{Math.floor(weather.main.temp - 273.15)} ° C</span>
              : <span className="col-span-2 font-light text-7xl sm:text-8xl">{Math.floor((weather.main.temp - 273.15) * 9 / 5 + 32)} ° F</span>}


            <div>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
            </div>
          </article>

          <article className="grid grid-cols-3 bg-[rgb(224,224,224)]/50 rounded-[22.94px] p-6  sm:grid-cols-1 ">
            {isCelsius ? <WeatherAdditionalInfo img={"/wind.png"} info={{ measures: weather.wind.speed, measurement: 'm/s' }} />
              : <WeatherAdditionalInfo img={"/wind.png"} info={{ measures: (weather.wind.speed * 2.237).toFixed(2), measurement: 'm/h' }} />}

            <WeatherAdditionalInfo img={"/humidity.png"} info={{ measures: weather.main.humidity, measurement: "%" }} />

            <WeatherAdditionalInfo img={"/pressure.png"} info={{ measures: weather.main.pressure, measurement: "hPa" }} />
          </article>
        </div>

        <button className="bg-white min-w-[134px] min-h-[30px] mx-auto rounded-[19px] text-[rgb(69,128,186)]" onClick={changeUnitTemp}>{isCelsius ? "Cambiar a F°" : "Cambiar a C°"}</button>
      </section>

    </main>
  )
}

export default WeatherContainer