!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const e=async(e="Toronto")=>{const t=`https://api.weatherapi.com/v1/forecast.json?key=219a015ee939448aa0f195825231010&q=${e}&days=1&aqi=no&alerts=no`;try{const e=await fetch(t),n=await e.json();if(n.error)throw new Error(n.error.message);return n}catch(n){throw console.error(`Error fetching data for ${e}: ${n.message}`),n}},t=e=>{const t=e.current,n=e.forecast.forecastday[0];return{location:`${e.location.name}, ${e.location.region}, ${e.location.country}`,temperature:t.temp_c,feelsLike:t.feelslike_c,uv:t.uv,description:t.condition.text,humidity:t.humidity,windSpeed:t.wind_kph,icon:t.condition.icon,daily_chance_of_rain:n.day.daily_chance_of_rain,daily_chance_of_snow:n.day.daily_chance_of_snow,hourly_forecast:n.hour}},n=e=>{document.getElementById("location").textContent=e.location,document.getElementById("temperature").textContent=`${e.temperature}°C`,document.getElementById("feelsLike").textContent=`Feels like: ${e.feelsLike}°C`,document.getElementById("uvIndex").textContent=`UV Index: ${e.uv}`,document.getElementById("description").textContent=e.description,document.getElementById("humidity").textContent=`Humidity: ${e.humidity}%`,document.getElementById("windSpeed").textContent=`Wind speed: ${e.windSpeed} kph`,document.getElementById("icon").setAttribute("src",e.icon),o(),r(e.hourly_forecast);const t=e.daily_chance_of_rain,n=e.daily_chance_of_snow;document.getElementById("chanceOfRain").textContent=`Chance of Rain: ${t}%`,document.getElementById("chanceOfSnow").textContent=`Chance of Snow: ${n}%`},o=()=>{const e=new Date,t=e.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});let n=e.getHours();const o=e.getMinutes(),r=n>=12?"pm":"am";n%=12,n=n||12;const c=`${n}:${o<10?"0"+o:o}${r}`;document.getElementById("currentDate").textContent=t,document.getElementById("currentTime").textContent=c},r=e=>{const t=document.getElementById("hourlyForecast");t.innerHTML="",e.forEach((e=>{const n=document.createElement("div");n.classList.add("hourly-forecast-item");const o=new Date(e.time).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0});n.textContent=`${o} - ${e.temp_c}°C`,t.appendChild(n)}))},c="Toronto";document.getElementById("weatherForm").addEventListener("submit",(async o=>{o.preventDefault(),document.getElementById("errorMsg").style.display="none",document.getElementById("loading").style.display="block";const r=document.getElementById("locationInput").value||c;try{const o=await e(r),c=t(o);n(c)}catch(i){document.getElementById("errorMsg").innerText=i,document.getElementById("errorMsg").style.display="block"}finally{document.getElementById("loading").style.display="none"}})),(async()=>{const o=await e(c),r=t(o);n(r)})();
//# sourceMappingURL=index-f00d6621.js.map
