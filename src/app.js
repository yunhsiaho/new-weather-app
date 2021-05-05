import React, {useState} from "react"

const api ={
    key:`${process.env.REACT_APP_API_KEY}`,
    base:`${process.env.REACT_APP_API_URL}`
}

export default function App(){
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState('');
    const [countryName, setCountryName] = useState('');
    const [photo, setPhoto] = useState('');
    const [clientId,setClientId] = useState('XwUXPnukiHoX_3UNaY8vA_dYJtX2kPjSNbwaVFQAyls');
    // const [logo, setLogo] = useState('');


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
                    console.log(result.city.country);//BUG
                    return;
                }
            setCountryName(resultCountry.name);
            console.log(resultCountry.name); //BUG
            }).catch((error)=> {
                console.error(error);
                console.error("error country name");
            });
            console.log(result);//BUG
            //photo
            fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${clientId}`)
            .then(response => response.json())
            .then(resultPhoto => {
                setPhoto(resultPhoto.results[0].urls.small);
                console.log(resultPhoto);
            }).catch((error)=> {
                console.error(error);
                console.error("error photo");
            });
        }).catch((error)=> {
            console.error(error);
            console.error("error city name");
            setPhoto("");
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
        <div className="app">
            {/* <div style={{ 
                backgroundImage: `url(${photo})`,
                backgroundRepeat: 'no-repeat',
                width:'500%',
                opacity:0.9
            }}> */}
            <main>
            <div className="search-box">
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
                <div className="location-box">
                    <div className="location">{weather.city.name}, {countryName}</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div>
                    <div className="date">
                        {weather.list[0].dt_txt.substr(0, 16)}
                    </div>
                </div>
                <div className="weather-box">
                    <div className="temp">
                        <p>{Math.round(weather.list[0].main.temp-273.15)}°C</p>
                        {/* <p>Max{Math.round(weather.list[0].main.temp_max-273.15)}°C</p> */}
                    </div>
                    <div className="weather">
                        {weather.list[0].weather[0].description}
                    </div>
                    <div className="all-weather">
                    <table data-toggle="table">
                        <thead>
                        <tr>
                            <th>{weather.list[0].dt_txt.substr(0, 10)}</th>
                            <th>{weather.list[8].dt_txt.substr(0, 10)}</th>
                            <th>{weather.list[16].dt_txt.substr(0, 10)}</th>
                            <th>{weather.list[24].dt_txt.substr(0, 10)}</th>
                            <th>{weather.list[32].dt_txt.substr(0, 10)}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><img src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`} alt="" /></td>
                            <td><img src={`http://openweathermap.org/img/wn/${weather.list[8].weather[0].icon}@2x.png`} alt="" /></td>
                            <td><img src={`http://openweathermap.org/img/wn/${weather.list[16].weather[0].icon}@2x.png`} alt="" /></td>
                            <td><img src={`http://openweathermap.org/img/wn/${weather.list[24].weather[0].icon}@2x.png`} alt="" /></td>
                            <td><img src={`http://openweathermap.org/img/wn/${weather.list[32].weather[0].icon}@2x.png`} alt="" /></td>
                        </tr> 
                        <tr>
                            <td><p>{Math.round(weather.list[0].main.temp-273.15)}°C</p></td>
                            <td><p>{Math.round(weather.list[8].main.temp-273.15)}°C</p></td>
                            <td><p>{Math.round(weather.list[16].main.temp-273.15)}°C</p></td>
                            <td><p>{Math.round(weather.list[24].main.temp-273.15)}°C</p></td>
                            <td><p>{Math.round(weather.list[32].main.temp-273.15)}°C</p></td>
                        </tr>  
                        <tr>
                            <td><p>{weather.list[0].weather[0].description}</p></td>
                            <td><p>{weather.list[8].weather[0].description}</p></td>
                            <td><p>{weather.list[16].weather[0].description}</p></td>
                            <td><p>{weather.list[24].weather[0].description}</p></td>
                            <td><p>{weather.list[32].weather[0].description}</p></td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            ):('')}
            <img src={photo} alt="" />
            </main>
            </div>
        // </div>    
    );
}