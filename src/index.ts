import '../src/style.css'
import { updateWeather } from './weather';

const form = document.getElementById('city-form') as HTMLFormElement;
const search = document.getElementById('city-search') as HTMLInputElement;
const inputError = document.getElementById('search-error') as HTMLSpanElement;
const weatherContainer = document.getElementById('weather') as HTMLElement;
const forecastContainer = document.getElementById('forecast') as HTMLElement;

updateWeather('London');

function fadeInBlock(element: HTMLElement): void {
  element.style.display = 'none';
  element.classList.remove('fade');
  element.offsetWidth;
  element.style.display = 'block';
  element.classList.add('fade');
};

function fadeInFlex(element: HTMLElement): void {
  element.style.display = 'none';
  element.classList.remove('fade');
  element.offsetWidth;
  element.style.display = 'flex';
  element.classList.add('fade');
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    try {
      await updateWeather(search.value);
      hideError();
      fadeInFlex(weatherContainer);
      fadeInFlex(forecastContainer);
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
  fadeInBlock(inputError);

  if (search.validity.valueMissing)
    inputError.textContent = 'Empty city name';
  else
    inputError.textContent = 'Invalid city name';
};

function hideError() {
  inputError.textContent = '';
  inputError.style.display = 'none';
};
