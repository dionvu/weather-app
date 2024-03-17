import '../src/style/style.css'

interface Weather {
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

let city: string | null = '';

city = prompt();

if (city)
  updateWeather(city);

async function updateWeather(city: string) {
  try {
    const data: Weather = await getWeather(city);
    console.log(data.current.condition.text);
  }
  catch (error) {
    console.log(error);
  }
};

async function getWeather(city: string): Promise<Weather> {
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=2b3d697043e1487987335611240703&q=${city}`, { mode: 'cors' });

  if (!response.ok)
    return Promise.reject(new Error(`ERROR: Unable to fetch data for ${city}.`));

  const data: Weather = await response.json();

  console.table(data);

  return Promise.resolve(data);
};
