import React, {useState} from "react"
// import {Button} from 'react-bootstrap/Button';

// or less ideally

const api ={
    key:`${process.env.REACT_APP_API_KEY}`,
    base:`${process.env.REACT_APP_API_URL}`,
    unsplash:`${process.env.REACT_APP_API_KEY_1}`
}

export default function App(){
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState('');
    const [countryName, setCountryName] = useState('');
    const [photo, setPhoto] = useState('https://images.unsplash.com/photo-1556115908-233c785befbe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');


    const search = async evt => {
        if(evt.key === 'Enter'){
            //fetch weather
            await fetch(`${api.base}forecast?q=${query}&appid=${api.key}`)
            .then(res => res.json())
            .then(result => {
            setWeather(result);
            setQuery('');
            //convert city name
            fetch(`https://restcountries.eu/rest/v2/alpha/${result.city.country}`)
            .then(response => response.json())
            .then(resultCountry => {
                if(resultCountry.name.length>15){
                    setCountryName(result.city.country);
                    console.log(result.city.country);
                    return;
                }
            setCountryName(resultCountry.name);
            console.log(resultCountry.name); 
            }).catch((error)=> {
                console.error(error);
                console.error("error country name");
            });
            console.log(result);
            //photo
            fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=XwUXPnukiHoX_3UNaY8vA_dYJtX2kPjSNbwaVFQAyls`)
            .then(response => response.json())
            .then(resultPhoto => {
                setPhoto(resultPhoto.results[0].urls.full
                    );
                console.log(resultPhoto);
                // console.log(process.env.REACT_APP_API_KEY_1);FIXME
            }).catch((error)=> {
                setPhoto("")
                console.error(error);
                console.error("error photo");
            });
        }).catch((error)=> {
            console.error(error);
            console.error("error city name");
            alert('Please enter the right city name!');
        });
        }
    }
    const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
    }
    
    return(
        <div className="app container-fluid m-0 " style={{ 
            backgroundImage: `url(${photo})` ,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `cover`
            }}
            >
            <div className="row">
            <main>
            <p className="greeting">Hello world!</p>
            <div className="search-box col-12 ">
                <input
                type="text"
                className="search-bar"
                placeholder="Searching City..."
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
                />
            </div>
            {(typeof weather.list!= "undefined")?(   
            <div>    
                <div className="weather-box row">         
                    <div className="location-box col-12 col-lg-5">
                        <div className="location">{weather.city.name}, {countryName}</div>
                        <div className="date">{dateBuilder(new Date())}</div>
                        <div className="temp">
                        <p className="temp-num">{Math.round(weather.list[0].main.temp-273.15)}°C</p>
                        </div>
                    </div>
                    <div className="weather col-12 col-lg-5">
                    <img src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`} alt="" />
                    <p>{weather.list[0].weather[0].description}</p>
                    </div>
                </div>        
                    <div className="all-weather row d-flex m-auto">

                        <div className="day1 col-11 col-md-11 col-lg-2">
                            <div className="title">
                            {weather.list[8].dt_txt.substr(0, 10)}
                            </div>
                            <div className="logogo">
                            <img src={`http://openweathermap.org/img/wn/${weather.list[8].weather[0].icon}@2x.png`} alt="" />
                            </div>
                            <div className="tempature">
                            <p>{Math.round(weather.list[8].main.temp-273.15)}°C</p>
                            </div><div className="description">
                            <p>{weather.list[8].weather[0].description}</p>
                            </div>
                        </div>

                        <div className="day2 col-11 col-md-5 col-lg-2">
                            <div className="title">
                            {weather.list[16].dt_txt.substr(0, 10)}
                            </div>
                            <div className="logogo">
                            <img src={`http://openweathermap.org/img/wn/${weather.list[16].weather[0].icon}@2x.png`} alt="" />
                            </div>
                            <div className="tempature">
                            <p>{Math.round(weather.list[16].main.temp-273.15)}°C</p>
                            </div><div className="description">
                            <p>{weather.list[16].weather[0].description}</p>
                            </div>
                        </div>

                        <div className="day3 col-11 col-md-5 col-lg-2">
                            <div className="title">
                            {weather.list[24].dt_txt.substr(0, 10)}
                            </div>
                            <div className="logogo">
                            <img src={`http://openweathermap.org/img/wn/${weather.list[24].weather[0].icon}@2x.png`} alt="" />
                            </div>
                            <div className="tempature">
                            <p>{Math.round(weather.list[24].main.temp-273.15)}°C</p>
                            </div><div className="description">
                            <p>{weather.list[24].weather[0].description}</p>
                            </div>
                        </div>

                        <div className="day4 col-11 col-md-5 col-lg-2">
                            <div className="title">
                            {weather.list[32].dt_txt.substr(0, 10)}
                            </div>
                            <div className="logogo">
                            <img src={`http://openweathermap.org/img/wn/${weather.list[32].weather[0].icon}@2x.png`} alt="" />
                            </div>
                            <div className="tempature">
                            <p>{Math.round(weather.list[32].main.temp-273.15)}°C</p>
                            </div><div className="description">
                            <p>{weather.list[32].weather[0].description}</p>
                            </div>
                        </div>

                        <div className="day5 col-11 col-md-5 col-lg-2">
                            <div className="title">
                            {weather.list[39].dt_txt.substr(0, 10)}
                            </div>
                            <div className="logogo">
                            <img src={`http://openweathermap.org/img/wn/${weather.list[39].weather[0].icon}@2x.png`} alt="" />
                            </div>
                            <div className="tempature">
                            <p>{Math.round(weather.list[39].main.temp-273.15)}°C</p>
                            </div><div className="description">
                            <p>{weather.list[39].weather[0].description}</p>
                            </div>
                        </div>
                    </div>
            </div>
            ):('')}
            </main>
            </div>
        </div>    
    );
}