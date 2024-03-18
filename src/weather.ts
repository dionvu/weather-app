import { getLocationImage } from "./image";
import { hideError } from ".";

export default interface Weather {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    condition: {
      text: string;
      icon: string;
    }
    temp_f: number;
  }
}

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

async function getApi(city: string): Promise<Weather> {
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=2b3d697043e1487987335611240703&q=${city}`, { mode: 'cors' });

  if (!response.ok)
    return Promise.reject(new Error(`ERROR: Unable to fetch data for city: ${city}.`));

  const data: Weather = await response.json();

  console.table(data);

  return Promise.resolve(data);
};


const city = document.getElementById('city') as HTMLSpanElement;
const location = document.getElementById('location') as HTMLSpanElement;
const locationImage = document.getElementById('location-image') as HTMLImageElement;
const localTime = document.getElementById('localtime') as HTMLSpanElement;
const temp = document.getElementById('temp') as HTMLElement;

const search = document.getElementById('city-search') as HTMLInputElement;
const weatherContainer = document.getElementById('weather') as HTMLElement;

export async function updateWeather(cityName: string) {
  try {
    const data = await getWeather(cityName);
    const url = await getLocationImage(cityName);

    //conditionImage.src = data.current.condition.icon;
    locationImage.src = url;

    if (data.location.region.length >= data.location.country.length) {
      location.textContent = data.location.country;
    }
    else {
      location.textContent = data.location.region;
    }

    city.textContent = data.location.name;

    localTime.textContent = data.location.localtime;

    temp.textContent = data.current.temp_f.toString() + 'F';

    search.value = '';
    hideError();
  }
  catch (error) {
    weatherContainer.style.display = 'block';
    return Promise.reject(`ERROR: ${error}`);
  }
};
