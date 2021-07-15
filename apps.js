// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weatherApi ={
    key:"a13c00f482835483759736177a36418d",
    baseUrl:"https://api.openweathermap.org/data/2.5/weather"

}
const searchInputBox=document.getElementById('input-box');
searchInputBox.addEventListener('keypress',(Event)=>{
    if(Event.keyCode==13){
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display="block";
    }
});
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather=>{
        return weather.json();
    }).then(showWeatherReport);
}
function showWeatherReport(weather){
    console.log(weather);
    let city=document.getElementById('city');
    city.innerText=`${weather.name},${weather.sys.country}`;

    let temprature=document.getElementById('temp');
    temprature.innerHTML=`${Math.round(weather.main.temp)}&deg;C`;

    let minMaxtemp=document.getElementById('min-max');
    minMaxtemp.innerHTML=`${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;
    
    let weatherType=document.getElementById('weather');
    weatherType.innerText=`${weather.weather[0].main}`;

    let date=document.getElementById('date');
    let todayDate=new Date();
    date.innerText=dateManage(todayDate);


    if(weatherType.textContent=='Clear'){
        document.body.style.backgroundImage="url('./clear.jpg')";
    }else  if(weatherType.textContent=='Clouds'){
        document.body.style.backgroundImage="url('./cloud.jpg')";
    }else if(weatherType.textContent=='Rain'){
        document.body.style.backgroundImage="url('./rain.jpg')";
    }else if(weatherType.textContent=='Snow'){
        document.body.style.backgroundImage="url('./snow.jpg')";
    }else if(weatherType.textContent=='Sunny'){
        document.body.style.backgroundImage="url('./sunny.jpg')";
    
    }else  if(weatherType.textContent=='Haze'){
        document.body.style.backgroundImage="url('./haze.jpeg')";
    
    }else  if(weatherType.textContent=='Thunderstorm'){
        document.body.style.backgroundImage="url('./thundersotorm.jpg')";
    }

}

function dateManage(dateArg){
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];

    let year=dateArg.getFullYear();
    let month=months[dateArg.getMonth()];
    let date=dateArg.getDate();
    let day=days[dateArg.getDay()];

    return `${date} ${month} (${day}),${year}`;

} 
