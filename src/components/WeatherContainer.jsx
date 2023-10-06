import { useState } from "react"
import WeatherAdditionalInfo from "./WeatherAdditionalInfo"
import axios from "axios";

const WeatherContainer = ({ weather, setWeather }) => {
  const [isCelsius, setIsCelsius] = useState(true)
  const [inputText, setInputText] = useState("");
  const [isHovered, setIsHovered] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  // const [isHoveredDarkMode, setIsHoveredDarkMode] = useState(false)

  // const hoveredDarkMode = () => {
  //   if (isDarkMode && isHovered) {
  //     setIsHoveredDarkMode(true)
  //   }
  // } 

  // hoveredDarkMode()

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleMouseOut = () => {
    setIsHovered(false)
  }

  const handleMouseOver = () => {
    setIsHovered(true)
  }

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
    <main className={`
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
                                        weatherMain === "Tornado" && 'bg-[url("/Tornado.jpg")]'
      } bg-cover bg-center`}>

      <div className={`h-screen flex items-center justify-start flex-col ${isDarkMode ? "bg-black/50" : ""}`}>

        <div className="flex justify-center h-115 mb-[6rem] sm:mb-[10rem] customh:mx-auto customh:h-1/6 customh:mt-auto customh:mb-0">
          <div className={`flex border ${isDarkMode ? 'border-[#4580BA]' : 'border-[#4580BA]'} rounded top-0 mt-5 max-h-11`}>
            <input
              type="text"
              className={`block w-full px-4 py-2 ${isDarkMode ? 'text-[#99c1e9] bg-slate-500 focus:border-blue-950 focus:ring-blue-950' : 'text-[#4580BA] bg-white focus:border-blue-400 focus:ring-white'} border rounded-md focus:outline-none focus:ring focus:ring-opacity-40`}
              placeholder="Buscar..."
              onChangeCapture={inputHandler}
            />
            <button onClick={searchCity} className={`px-3 text-white ${isDarkMode ? "bg-blue-900" : "bg-blue-600"} rounded `}>
              <img src="/search.png" alt="search icon" />
            </button>
          </div>
        </div>



        <section className="grid text-center w-screen gap-5 px-3 justify-center customh:mb-auto">
          <h2 className={`text-xl font-bold sm:text-3xl ${isDarkMode ? 'text-white/60' : 'text-black'}`}>{weather.name}, {weather.sys.country}</h2>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto] mx-auto">

            <article className="grid grid-cols-3 bg-[rgb(224,224,224)]/50 rounded-[38px] p-7 pt-4 items-center max-w-[449px] min-h-[216px] sm:h-[278px]">
              <h3 className={`col-span-3 text-lg capitalize font-semibold sm:text-2xl ${isDarkMode ? 'text-white/60' : 'text-black'}`}>{weather.weather[0].description}</h3>
              {isCelsius ? <span className={`${isHovered && "scale-105 text-[rgb(47,84,122)] duration-200"} col-span-2 font-light text-7xl sm:text-8xl`}>{Math.floor(weather.main.temp - 273.15)} ° C</span>
                : <span className={`${isHovered && "scale-105 text-[rgb(47,84,122)] duration-200"} col-span-2 font-light text-7xl sm:text-8xl`}>{Math.floor((weather.main.temp - 273.15) * 9 / 5 + 32)} ° F</span>}


              <div>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
              </div>
            </article>

            <article className={`grid grid-cols-3 bg-[rgb(224,224,224)]/50 rounded-[22.94px] p-6  sm:grid-cols-1 ${isDarkMode ? 'text-white/60' : 'text-black'}`}>
              {isCelsius ? <WeatherAdditionalInfo img={"/wind.png"} info={{ measures: weather.wind.speed, measurement: 'm/s' }} />
                : <WeatherAdditionalInfo img={"/wind.png"} info={{ measures: (weather.wind.speed * 2.237).toFixed(2), measurement: 'm/h' }} />}

              <WeatherAdditionalInfo img={"/humidity.png"} info={{ measures: weather.main.humidity, measurement: "%" }} />

              <WeatherAdditionalInfo img={"/pressure.png"} info={{ measures: weather.main.pressure, measurement: "hPa" }} />
            </article>
          </div>

          <button className={`${isDarkMode ? 'bg-[rgb(69,128,186)] text-white/60 hover:bg-white/60 hover:text-[rgb(69,128,186)]' : 'bg-white text-[rgb(69,128,186)] hover:bg-[rgb(69,128,186)] hover:text-white'} min-w-[134px] min-h-[30px] mx-auto rounded-[19px] hover:scale-105 active:scale-95 duration-200 transition ease-in-out`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={changeUnitTemp}>{isCelsius ? "Cambiar a F°" : "Cambiar a C°"}</button>
        </section>

        <div className="customh3:top-24 bottom-0 position: absolute pb-[1rem] customh2:pb-[2rem] customh:pb-[3rem]">
          <button onClick={handleDarkMode} className={`${isDarkMode ? 'bg-[rgb(69,128,186)] hover:bg-white/60' : 'bg-white hover:bg-[rgb(69,128,186)]'} rounded-full hover:scale-105 active:scale-95 transition duration-200 ease-in-out`}>
            <img className="w-[2rem] customh:w-[3rem]" src={`${isDarkMode ? '/bx-sun.svg' : '/bxs-moon.svg'}`} alt="" />
          </button>
        </div>
      </div>


    </main>
  )
}

export default WeatherContainer