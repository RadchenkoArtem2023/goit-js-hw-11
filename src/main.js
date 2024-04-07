import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const galleryList = document.querySelector('.gallery');
const input = document.querySelector('input');
const form = document.querySelector('form');
const loader = document.querySelector('.loader');

function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}

function showMessage(message, type = 'error') {
  iziToast[type]({
    message: message,
    position: 'topRight',
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const query = input.value.trim();

  if (query === '') {
    showMessage('Please fill in the field for search', 'error');
    return;
  }

  showLoader();

  fetchImages(query)
    .then(data => renderImages(data))
    .catch(error => {
      console.log(error);
      showMessage(
        '❌ Sorry, there are no images matching your search query. Please, try again!',
        'error'
      );
    })
    .finally(() => hideLoader());

  galleryList.innerHTML = ''; // Clear the gallery before loading new images
}

form.addEventListener('submit', handleFormSubmit);
