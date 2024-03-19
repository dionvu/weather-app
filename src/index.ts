import '../src/style.css'
import { updateWeather } from './weather';

const form = document.getElementById('city-form') as HTMLFormElement;
const search = document.getElementById('city-search') as HTMLInputElement;
const inputError = document.getElementById('search-error') as HTMLSpanElement;
const weatherContainer = document.getElementById('weather') as HTMLElement;
const forecastContainer = document.getElementById('forecast') as HTMLElement;

updateWeather('London');

function fadeIn(element: HTMLElement): void {
  element.style.display = 'none';
  element.classList.remove('fade');

  setTimeout(() => {
    element.style.display = 'flex';
    element.classList.add('fade');
  }, 0);
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    try {
      await updateWeather(search.value);
      hideError();
      fadeIn(weatherContainer);
      fadeIn(forecastContainer);
    }
    catch {
      displayError();
    }
  }
  else {
    displayError();
  }
});

function displayError() {
  fadeIn(inputError);

  if (search.validity.valueMissing)
    inputError.textContent = 'Empty city name';
  else
    inputError.textContent = 'Invalid city name';

  weatherContainer.style.display = 'flex';
};

function hideError() {
  inputError.textContent = '';
  inputError.style.display = 'none';
};
