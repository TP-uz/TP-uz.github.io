let getData = async (cityName)=>{
    let preeData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7674da634845e7c2d8c53ab0a48b8e29`)
    let data = await preeData.json()
    console.log(data)
    console.log(data.weather[0].icon);
    let icon = data.weather[0].icon
    let name = data.name
    let tempK = data.main.temp
    let tempC = Math.floor(tempK - 273.15)
    let des = data.weather[0].description

    let dom = document.getElementById("t")
    dom.innerHTML = `<img src="./icons/01d.png" alt="">
    <h3>${name}</h3>
    <hr>
    <h1>${tempC} *C</h1>
    <p>${des}</p>`;
}; 




let dom = document.getElementById("weather")
dom.onsubmit = (e)=>{
e.preventDefault();
let key = dom.city.value

console.log(key);
getData(key)
}