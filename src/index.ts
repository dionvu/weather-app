import { getWeather } from './weather'
import '../src/style/style.css'
import { getLocationImage } from './image'

const form = document.getElementById('city-form') as HTMLFormElement;
const search = document.getElementById('city-search') as HTMLInputElement;
const inputError = document.getElementById('search-error') as HTMLSpanElement;
const locationImage = document.getElementById('location-image') as HTMLImageElement;

const conditionImage = document.getElementById('weather-image') as HTMLImageElement;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    try {
      const data = await getWeather(search.value);
      const url = await getLocationImage(search.value);

      console.log(data.current.condition.text);
      conditionImage.src = data.current.condition.icon;
      locationImage.src = url;

      search.value = '';
      hideError();
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
  inputError.style.display = 'block';

  if (search.validity.valueMissing) {
    inputError.textContent = 'Empty city name';
  }
  else
    inputError.textContent = 'Invalid city name';
};

function hideError() {
  inputError.textContent = '';
  inputError.style.display = 'none';
}
