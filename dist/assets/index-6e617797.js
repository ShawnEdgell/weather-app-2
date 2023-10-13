!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const e=async(e="Toronto")=>{const t=`https://api.weatherapi.com/v1/forecast.json?key=219a015ee939448aa0f195825231010&q=${e}&days=1&aqi=no&alerts=no`;try{const e=await fetch(t),n=await e.json();if(n.error)throw new Error(n.error.message);return n}catch(n){throw console.error(`Error fetching data for ${e}: ${n.message}`),n}},t=e=>{const t=e.current,n=e.forecast.forecastday[0];return{location:`${e.location.name}`,temperature:t.temp_c,feelsLike:t.feelslike_c,uv:t.uv,description:t.condition.text,humidity:t.humidity,windSpeed:t.wind_kph,icon:t.condition.icon,daily_chance_of_rain:n.day.daily_chance_of_rain,daily_chance_of_snow:n.day.daily_chance_of_snow,hourly_forecast:n.hour}},n=e=>{document.getElementById("location").textContent=e.location,document.getElementById("temperature").textContent=`${e.temperature}°C`,document.getElementById("feelsLikeValue").textContent=`${e.feelsLike}°C`,document.getElementById("uvIndexValue").textContent=e.uv,document.getElementById("description").textContent=e.description,document.getElementById("humidityValue").textContent=`${e.humidity}%`,document.getElementById("windSpeedValue").textContent=`${e.windSpeed} kph`,document.getElementById("icon").setAttribute("src",e.icon),o(),c(e.hourly_forecast),document.getElementById("rainValue").textContent=`${e.daily_chance_of_rain}%`,document.getElementById("snowValue").textContent=`${e.daily_chance_of_snow}%`},o=()=>{const e=new Date,t=e.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});let n=e.getHours();const o=e.getMinutes(),c=n>=12?"pm":"am";n%=12,n=n||12;const a=`${n}:${o<10?"0"+o:o}${c}`;document.getElementById("currentDate").textContent=t,document.getElementById("currentTime").textContent=a},c=e=>{const t=document.getElementById("hourlyForecast");t.innerHTML="",e.forEach((e=>{const n=document.createElement("div");n.classList.add("hourly-forecast-item");const o=document.createElement("img");o.setAttribute("src",e.condition.icon),o.setAttribute("alt","Weather Icon");const c=document.createElement("span");c.textContent=new Date(e.time).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0});const a=document.createElement("span");a.textContent=`${e.temp_c}°C`,n.appendChild(o),n.appendChild(c),n.appendChild(a),t.appendChild(n)}))},a="Toronto";let r=1;document.getElementById("weatherButton").addEventListener("click",(async o=>{o.preventDefault(),document.getElementById("errorMsg").style.display="none",document.getElementById("loading").style.display="block";const c=document.getElementById("locationInput").value||a;try{const o=await e(c),a=t(o);n(a),r=1}catch(d){document.getElementById("errorMsg").innerText=d,document.getElementById("errorMsg").style.display="block"}finally{document.getElementById("loading").style.display="none"}})),(async()=>{const o=await e(a),c=t(o);n(c)})();(async()=>{try{const e=document.getElementById("locationInput").value||a,t=await(async e=>{try{const t=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=219a015ee939448aa0f195825231010&q=${e}&days=7&aqi=no&alerts=no`);if(!t.ok)throw new Error("Unable to fetch 7-day forecast data.");return(await t.json()).forecast.forecastday}catch(t){throw t}})(e);(e=>{const t=document.querySelector(".seven-day-forecast");t.innerHTML="",e.forEach((e=>{const n=document.createElement("div");n.classList.add("forecast-day");const o=new Date(e.date).toLocaleDateString("en-US",{weekday:"long"}),c=e.day.condition.icon,a=e.day.maxtemp_c,r=e.day.mintemp_c;n.innerHTML=`\n            <div class="forecast-day-icon">\n                <img src="${c}" alt="Weather Icon">\n            </div>\n            <div class="forecast-day-info">\n                <div class="forecast-day-name">${o}</div>\n                <div class="forecast-day-temp">${a}°C / ${r}°C</div>\n            </div>\n        `,t.appendChild(n)}))})(t)}catch(e){console.error("Error fetching 7-day forecast:",e)}})();const d=document.getElementById("daily"),i=document.getElementById("hourly"),s=document.getElementById("forecast-content");d.addEventListener("change",(()=>{s.classList.remove("show-hourly")})),i.addEventListener("change",(()=>{s.classList.add("show-hourly")}));
//# sourceMappingURL=index-6e617797.js.map
