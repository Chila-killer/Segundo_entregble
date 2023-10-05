import { useEffect, useState } from 'react'
import './App.css'

import WeatherContainer from './components/WeatherContainer'
import axios from 'axios'
import Loader from './components/Loader'


function App() {
  const [weather, setWeather] = useState(null)

  const succes = (pos) => {
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    const API_KEY = "1f0803b7e21d6152b057b363c6d92eb6"
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(({data}) => {
      setWeather(data)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succes)
  }, [])
  

  return (
    
    <main className='font-["Lato"] flex'>      
      {weather ? <WeatherContainer weather={weather} setWeather={setWeather}/> : <Loader/>}
    </main>
  )
}



export default App
