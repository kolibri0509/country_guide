import { useState } from 'react'
import Filter from './Components/Filter'
import axios from 'axios'

const ShowCountry = ({country}) => {
  const[state, setState] = useState({});
  const[isShow, setShow] = useState(false);
  const[weather, setWeather] = useState({})
    const getInfo = () => {
          setShow((s) => !s);
          if (state.capital) return;
          const baseUrlItem = `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`;          
          axios.get(baseUrlItem)
            .then((response) => {
              response.data.languages = Object.values(response.data.languages).join(", ")
              setState(response.data);
              console.log(response.data)
              return response.data;
            });
          const api_key = import.meta.env.VITE_SOME_KEY
          const getWeather = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${api_key}`
          axios.get(getWeather)
            .then((response) => {
              response.data.wind  
              setWeather(response.data);
              console.log(response.data);
              return response.data;
            })
        };
        return (
              <div>
                <h1>{country}</h1>{" "}
                <button onClick={getInfo}>
                  {isShow ? "hide" : "show"}
                </button>
                {isShow && state.capital && weather.main && (
                  <div>
                    <h1>{state.country}</h1>
                    <h3>Capital: {state.capital[0]}</h3>
                    <h3>Area: {state.area} km²</h3>
                    <h3>Languages: {state.languages}</h3>
          
                    <div style={{ border: "1px solid black", width: "fit-content"}}>
                      <img src={state.flags["png"]} />
                    </div>
                    <h2>Weather in {state.capital}</h2>
                    <h3>temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</h3>
                    <h3>{weather.weather[0].description}</h3>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
                    <h3>wind {weather.wind.speed} m/s</h3>
                  </div>
                )}
              </div>
            );
          };

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [findCountrieValue, setFindCountrieValue] = useState('')

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  const findCountrie = (event) => {
    setFindCountrieValue(event.target.value)

    axios.get(baseUrl).then(response =>
      setCountries(response.data
      .map(c => c.name.common).filter(c => c.toUpperCase()
  .indexOf(findCountrieValue.toUpperCase()) > -1)))
  }
  const list = countries.map((country) => (
    <ShowCountry key={country} country={country} />)) 

  return (
    <div>
      <Filter find={findCountrie} value={findCountrieValue}/> 
      <div className="list">
        {list.length > 10 ?
          'Too many matches, specify another filter'
          : list}
      </div>
    </div>
  )
}
export default App
