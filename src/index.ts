import '../src/style.css'
import { updateForcast } from './forecast';
import { updateWeather } from './weather';

const cityInput = document.getElementById('city-form') as HTMLFormElement;
const search = document.getElementById('city-search') as HTMLInputElement;
const inputError = document.getElementById('search-error') as HTMLSpanElement;
const weatherContainer = document.getElementById('weather') as HTMLElement;
const forecastContainer = document.getElementById('forecast') as HTMLElement;

updateWeather('London');
updateForcast('London');

/**
 * @brief Fades-in a dom element.
 * @param element The container or element to be faded-in.
 */
function fadeIn(element: HTMLElement): void {
  element.classList.remove('fade');
  element.style.display = 'none';
  element.offsetHeight;
  element.style.display = 'flex';
  element.classList.add('fade');
};

/**
 * @brief Handles the input in city search bar.
 */
cityInput.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (cityInput.checkValidity()) {
    try {
      let city = search.value;
      await updateWeather(city);
      await updateForcast(city);

      hideError();
      fadeIn(weatherContainer);
      fadeIn(forecastContainer);
    }
    catch {
      displayError();
    }
  }
  else
    displayError();
});

/**
 * @brief Displays an error message below city search bar.
 */
function displayError() {
  fadeIn(inputError);

  if (search.validity.valueMissing)
    inputError.textContent = 'Empty city name';
  else
    inputError.textContent = 'Invalid city name';
};

/**
 * @brief Removes error message below city search bar.
 */
function hideError() {
  inputError.textContent = '';
  inputError.style.display = 'none';
};
