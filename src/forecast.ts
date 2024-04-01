import { getWeather } from "./weather";

// The forecast container.
const forecast = document.getElementById('forecast') as HTMLElement;

/**
 * @brief Updates the forcast container with the forecast of the given city name.
 * @param cityName The name of the city to fetch forecast for.
 * @returns void
 */
export async function updateForcast(cityName: string) {
  const data = await getWeather(cityName);
  forecast.innerHTML = '';

  let highest = -1000;
  let lowest = 1000;

  // Locations the lowerest and highest temperature
  data.forecast.forecastday[0].hour.forEach((hour) => {
    if (hour.temp_f > highest) highest = hour.temp_f;
    if (hour.temp_f < lowest) lowest = hour.temp_f;
  })

  for (let i = 0; i < data.forecast.forecastday[0].hour.length; i++) {
    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item');

    const forecastTime = document.createElement('span');
    forecastTime.classList.add('forecast-time');

    const forecastTemp = document.createElement('span');
    forecastTemp.classList.add('forecast-temp');

    forecastTemp.textContent = data.forecast.forecastday[0].hour[i].temp_f.toString() + 'F';

    // Highlights lowest and highest temperature as green and red respectively.
    if (data.forecast.forecastday[0].hour[i].temp_f === lowest)
      forecastTemp.style.color = 'green';
    if (data.forecast.forecastday[0].hour[i].temp_f === highest)
      forecastTemp.style.color = 'red';

    // Removes unnecessary date and only keeps hour of the day.
    forecastTime.textContent = data.forecast.forecastday[0].hour[i].time.split(' ')[1];

    forecastItem.appendChild(forecastTemp);
    forecastItem.appendChild(forecastTime);
    forecast.appendChild(forecastItem);
  }
};

/**
 * @brief Makes the forcasst container draggable to reveal overflown information.
 */
function makeDragable(): void {
  let mouseDown = false;
  let startX: number, scrollLeft: number;
  const slider = document.querySelector('#forecast') as HTMLElement;

  const startDragging = (e: any) => {
    mouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };

  const stopDragging = () => {
    mouseDown = false;
  };

  const move = (e: any) => {
    e.preventDefault();
    if (!mouseDown) { return; }
    const x = e.pageX - slider.offsetLeft;
    const scroll = x - startX;
    slider.scrollLeft = scrollLeft - scroll;
  };

  slider.addEventListener('mousemove', move, false);
  slider.addEventListener('mousedown', startDragging, false);
  slider.addEventListener('mouseup', stopDragging, false);
  slider.addEventListener('mouseleave', stopDragging, false);
}

makeDragable();
