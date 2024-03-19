import Weather from "./weather";

const forecast = document.getElementById('forecast') as HTMLElement;

export function updateForcast(data: Weather) {
  forecast.innerHTML = '';

  let highest = -1000;
  let lowest = 1000;
  data.forecast.forecastday[0].hour.forEach((hour) => {
    if (hour.temp_f > highest) highest = hour.temp_f;
    if (hour.temp_f < lowest) lowest = hour.temp_f;
  })

  console.log(highest, lowest);

  for (let i = 0; i < data.forecast.forecastday[0].hour.length; i++) {
    console.log(`Length: `, data.forecast.forecastday[0].hour.length);
    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item');

    const forecastTime = document.createElement('span');
    forecastTime.classList.add('forecast-time');

    const forecastTemp = document.createElement('span');
    forecastTemp.classList.add('forecast-temp');

    forecastTemp.textContent = data.forecast.forecastday[0].hour[i].temp_f.toString() + 'F';

    if (data.forecast.forecastday[0].hour[i].temp_f === lowest) {
      forecastTemp.style.color = 'green';
    }
    if (data.forecast.forecastday[0].hour[i].temp_f === highest) {
      forecastTemp.style.color = 'red';
    }

    forecastTime.textContent = data.forecast.forecastday[0].hour[i].time.split(' ')[1];

    forecastItem.appendChild(forecastTemp);
    forecastItem.appendChild(forecastTime);
    forecast.appendChild(forecastItem);
  }
};

let mouseDown = false;
let startX: any, scrollLeft: any;
const slider = document.querySelector('#forecast') as HTMLElement;

const startDragging = (e: any) => {
  mouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
}

const stopDragging = (e: Event) => {
  mouseDown = false;
}

const move = (e: any) => {
  e.preventDefault();
  if (!mouseDown) { return; }
  const x = e.pageX - slider.offsetLeft;
  const scroll = x - startX;
  slider.scrollLeft = scrollLeft - scroll;
}

slider.addEventListener('mousemove', move, false);
slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);
