import '../src/style/style.css'

interface City {
  location: {
    name: string;
    region: string;
    country: string;
  };
  conditions: {
    text: string;
    icon: string;
  };
}

async function getApiData(cityName: string): Promise<City> {
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=2b3d697043e1487987335611240703&q=${cityName}`, { mode: 'cors' });
  const data: City = await response.json();
  console.log(data.location.region);
  return data;
}

let name: string | null = '';

name = prompt("Enter city name!");

name = name ? name : '';

console.log(name);

const data = getApiData(name);

data
  .then(() => {
    console.log(`Success grabbing API data for ${name}.`);
  })
  .catch(error => {
    console.error(`ERROR: ${error}`);
  });
