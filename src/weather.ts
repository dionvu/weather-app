import { getLocationImage } from "./image";
import { updateForcast } from "./forecast";

export default interface Weather {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  },
  current: {
    condition: {
      text: string;
      icon: string;
    }
    temp_f: number;
  },
  forecast: {
    forecastday: {
      hour: {
        time: string;
        temp_f: number;
      }[]
    }[]
  },
};

const city = document.getElementById('city') as HTMLSpanElement;
const location = document.getElementById('location') as HTMLSpanElement;
const condition = document.getElementById('condition') as HTMLSpanElement;
const tempurature = document.getElementById('temp') as HTMLElement;
const locationImage = document.getElementById('location-image') as HTMLImageElement;
const localTime = document.getElementById('localtime') as HTMLSpanElement;
const search = document.getElementById('city-search') as HTMLInputElement;
const weatherContainer = document.getElementById('weather') as HTMLElement;

export async function getWeather(city: string): Promise<Weather> {
  try {
    const data: Weather = await getApi(city);
    return data;
  }
  catch (error) {
    console.log(`ERROR: ${error}.`)
    return Promise.reject(error);
  }
};

export async function getApi(city: string): Promise<Weather> {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2b3d697043e1487987335611240703&q=${city}`, { mode: 'cors' });

  if (!response.ok)
    return Promise.reject(new Error(`ERROR: Unable to fetch data for city: ${city}.`));

  const data: Weather = await response.json();

  return Promise.resolve(data);
};

export async function updateWeather(cityName: string) {
  try {
    const data = await getWeather(cityName);
    const url = await getLocationImage(cityName);

    if (data.location.region.length === 0)
      location.textContent = data.location.country;
    else if (data.location.region.length <= data.location.country.length)
      location.textContent = data.location.region;
    else
      location.textContent = data.location.country;

    locationImage.src = url;
    city.textContent = data.location.name;
    condition.textContent = data.current.condition.text;
    localTime.textContent = data.location.localtime;
    tempurature.textContent = data.current.temp_f.toString() + 'F';
    search.value = '';
  }
  catch (error) {
    weatherContainer.style.display = 'flex';
    return Promise.reject(`ERROR: ${error}`);
  }
};
