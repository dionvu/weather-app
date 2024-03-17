//import Weather from './weather'
import { getWeather } from './weather'
import '../src/style/style.css'


const form = document.getElementById('city-form') as HTMLFormElement;
const input = document.getElementById('city-input') as HTMLInputElement;
const msg = document.getElementById('input-error') as HTMLSpanElement;
const img = document.getElementById('img') as HTMLImageElement;

form.addEventListener('submit', async (e) => {
  if (form.checkValidity()) {
    e.preventDefault();
    try {
      const data = await getWeather(input.value);
      console.log(data.current.condition.text);
      img.src = data.current.condition.icon;
      input.value = '';
      hideError();
    }
    catch {
      displayError();
      input.value = '';
    }
  }
})

function displayError() {
  msg.style.display = 'block';
  msg.textContent = 'Invalid city name!';
};

function hideError() {
  msg.textContent = '';
  msg.style.display = 'none';
}
