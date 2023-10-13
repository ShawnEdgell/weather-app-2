!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const e="219a015ee939448aa0f195825231010";let t=1;document.getElementById("weatherForm").addEventListener("submit",(async e=>{e.preventDefault(),document.getElementById("errorMsg").style.display="none",document.getElementById("loading").style.display="block";const i=document.getElementById("locationInput").value.trim();try{const e=await n(i),d=a(e);r(d),t=1;const s=await o(i);c(s),u(i)}catch(d){document.getElementById("errorMsg").innerText=d,document.getElementById("errorMsg").style.display="block"}finally{document.getElementById("loading").style.display="none"}})),(async()=>{})();const n=async t=>{const n=`https://api.weatherapi.com/v1/forecast.json?key=${e}&q=${t}&days=1&aqi=no&alerts=no`;try{const e=await fetch(n),t=await e.json();if(t.error)throw new Error(t.error.message);return t}catch(o){throw console.error(`Error fetching data for ${t}: ${o.message}`),o}},o=async t=>{try{const n=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${e}&q=${t}&days=7&aqi=no&alerts=no`);if(!n.ok)throw new Error("Unable to fetch 7-day forecast data.");return(await n.json()).forecast.forecastday}catch(n){throw n}},c=e=>{const t=document.querySelector(".seven-day-forecast");t.innerHTML="",e.forEach((e=>{const n=document.createElement("div");n.classList.add("forecast-day");const o=new Date(e.date).toLocaleDateString("en-US",{weekday:"long"}),c=e.day.condition.icon,a=e.day.maxtemp_c,r=e.day.mintemp_c;n.innerHTML=`\n            <div class="forecast-day-icon">\n                <img src="${c}" alt="Weather Icon">\n            </div>\n            <div class="forecast-day-info">\n                <div class="forecast-day-name">${o}</div>\n                <div class="forecast-day-temp">${a}°C / ${r}°C</div>\n            </div>\n        `,t.appendChild(n)}))},a=e=>{const t=e.current,n=e.forecast.forecastday[0];return{location:`${e.location.name}`,temperature:t.temp_c,feelsLike:t.feelslike_c,uv:t.uv,description:t.condition.text,humidity:t.humidity,windSpeed:t.wind_kph,icon:t.condition.icon,daily_chance_of_rain:n.day.daily_chance_of_rain,daily_chance_of_snow:n.day.daily_chance_of_snow,hourly_forecast:n.hour}},r=e=>{document.getElementById("location").textContent=e.location,document.getElementById("temperature").textContent=`${e.temperature}°C`,document.getElementById("feelsLikeValue").textContent=`${e.feelsLike}°C`,document.getElementById("uvIndexValue").textContent=e.uv,document.getElementById("description").textContent=e.description,document.getElementById("humidityValue").textContent=`${e.humidity}%`,document.getElementById("windSpeedValue").textContent=`${e.windSpeed} kph`,document.getElementById("icon").setAttribute("src",e.icon),i(),d(e.hourly_forecast),document.getElementById("rainValue").textContent=`${e.daily_chance_of_rain}%`,document.getElementById("snowValue").textContent=`${e.daily_chance_of_snow}%`},i=()=>{const e=new Date,t=e.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});let n=e.getHours();const o=e.getMinutes(),c=n>=12?"pm":"am";n%=12,n=n||12;const a=`${n}:${o<10?"0"+o:o}${c}`;document.getElementById("currentDate").textContent=`currentDate: ${t}`,document.getElementById("currentTime").textContent=`currentTime: ${a}`},d=e=>{const t=document.getElementById("hourlyForecast");t.innerHTML="";const n=new Date,o=n.getHours(),c=n.getMinutes();let a=o+1;c<1&&(a=o),e.forEach((e=>{const n=1e3*e.time_epoch,o=new Date(n).getHours();if(o>=a){const n=document.createElement("div");n.classList.add("hourly-forecast-item");const c=document.createElement("img");c.setAttribute("src",e.condition.icon),c.setAttribute("alt","Weather Icon");const r=`${o%12}:00 ${o>=12?"PM":"AM"}`,i=document.createElement("span");i.textContent=r;const d=document.createElement("span");d.textContent=`${e.temp_c}°C`,n.appendChild(c),n.appendChild(i),n.appendChild(d),t.appendChild(n),a++}}))},s=document.getElementById("daily"),l=document.getElementById("hourly"),m=document.getElementById("forecast-content");s.addEventListener("change",(()=>{m.classList.remove("show-hourly")})),l.addEventListener("change",(()=>{m.classList.add("show-hourly")}));const u=t=>{fetch(`https://api.weatherapi.com/v1/current.json?key=${e}&q=${t}`).then((e=>e.json())).then((e=>{const t=new Date(e.location.localtime),n=t.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});let o=t.getHours();const c=t.getMinutes(),a=o>=12?"pm":"am";o%=12,o=o||12;const r=`${o}:${c<10?"0"+c:c} ${a}`;document.getElementById("currentDate").textContent=`${n}`,document.getElementById("currentTime").textContent=`${r}`})).catch((e=>{console.error(`Error fetching date and time data for ${t}: ${e.message}`)}))};
//# sourceMappingURL=index-871a2017.js.map
