import { getLocationImage } from "./image";
import { hideError } from ".";


export default interface Weather {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    condition: {
      text: string;
      icon: string;
    }
  }
}


//const conditionImage = document.getElementById('weather-image') as HTMLImageElement;

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

