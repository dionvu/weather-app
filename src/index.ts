import Weather, { getWeather } from './weather'
import '../src/style.css'
import { getLocationImage } from './image'

const form = document.getElementById('city-form') as HTMLFormElement;
const search = document.getElementById('city-search') as HTMLInputElement;
const inputError = document.getElementById('search-error') as HTMLSpanElement;
const weatherContainer = document.getElementById('weather') as HTMLElement;

updateWeather('London');

function fadeIn(element: HTMLElement): void {
  element.style.display = 'none';
  element.classList.remove('fade');
  element.offsetWidth;
  element.style.display = 'block';
  element.classList.add('fade');
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    try {
      await updateWeather(search.value);
      fadeIn(weatherContainer);
    }
    catch {
      displayError();
    }
  }
  else {
    displayError();
  }
})

function displayError() {
  fadeIn(inputError);

  if (search.validity.valueMissing) {
    inputError.textContent = 'Empty city name';
  }
  else
    inputError.textContent = 'Invalid city name';
};

export function hideError() {
  inputError.textContent = '';
  inputError.style.display = 'none';
}

const city = document.getElementById('city') as HTMLSpanElement;
const location = document.getElementById('location') as HTMLSpanElement;
const locationImage = document.getElementById('location-image') as HTMLImageElement;

async function updateWeather(cityName: string) {
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

    search.value = '';
    hideError();
  }
  catch (error) {
    weatherContainer.style.display = 'block';
    return Promise.reject(`ERROR: ${error}`);
  }
};
