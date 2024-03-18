import '../src/style.css'
import { updateWeather } from './weather';

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

