import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { pixabayApi } from './js/pixabay-api.js';
import { renderFunctions } from './js/render-functions.js';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoad = document.querySelector('.load-more');

const BASE_URL = 'https://pixabay.com/api/?';
const request = {
  key: '42159131-e2480a23f0f5c24b1f6f03d93',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 15,
  page: 1,
};

let totalImg = 0;

const options = {
  overlayOpacity: 0.8,
  captionsData: 'alt',
  captionDelay: 250,
};

const lightbox = new SimpleLightbox('.gallery a', options);

form.addEventListener('submit', event => {
  event.preventDefault();

  gallery.innerHTML = '';
  request.page = 1;

  const input = document.querySelector('input');
  const inputValue = input.value.trim();

  if (!inputValue) {
    iziToast.warning({
      message: 'You forgot to enter your details',
    });
  } else {
    showLoader();
    request.q = inputValue;
    const url = BASE_URL + new URLSearchParams(request);
    getImages(url);
  }
  input.value = '';
});

const getImages = async (url, scrollHight) => {
  await pixabayApi(url)
    .then(({ data }) => {
      const arrayImg = data.hits;
      totalImg = data.totalHits;

      if (arrayImg.length > 0) {
        render(arrayImg);
        window.scrollBy({
          top: scrollHight,
          behavior: 'smooth',
        });
      } else {
        showLoader();
        iziToast.warning({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          color: '#f83d04',
        });
      }
    })
    .catch(error => {
      iziToast.warning({
        message: error,
      });
    });
};

function render(arrayImg) {
  renderFunctions(arrayImg);

  showLoader();
  btnLoad.classList.remove('hide');
  lightbox.refresh();
  totalImgFunction();
}

btnLoad.addEventListener('click', () => {
  request.page += 1;
  const url = BASE_URL + new URLSearchParams(request);

  showLoader();
  btnLoad.classList.add('hide');

  const scrollHight =
    document.querySelector('.gallery-items').getBoundingClientRect().height *
      2 +
    26;

  getImages(url, scrollHight);
});

function showLoader() {
  if (loader.classList.contains('hide')) {
    loader.classList.remove('hide');
  } else {
    loader.classList.add('hide');
    btnLoad.classList.add('hide');
  }
}

function totalImgFunction() {
  if (
    totalImg < request.page * request.per_page &&
    !btnLoad.classList.contains('hide')
  ) {
    btnLoad.classList.add('hide');
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
    });
  }
}
