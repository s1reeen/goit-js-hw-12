import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
/*=============================================================*/
import renderImages from './js/render-functions';
import { infoAPI } from './js/pizsbay-api';

const form = document.querySelector('.js-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.js-load-more');

const newInfoApi = new infoAPI();
let checkLastHits = 0;

form.addEventListener('submit', creatGallery);
loadMore.addEventListener('click', addNewInfo);

async function creatGallery(event) {
  event.preventDefault();
  const infoSearch = form.elements.text.value.trim();
  form.elements.text.value = '';
  gallery.innerHTML = '';

  if (infoSearch) {
    loader.classList.remove('visually-hidden');

    newInfoApi.page = 1;
    newInfoApi.query = infoSearch;

    try {
      const data = await newInfoApi.getInfoArticles(infoSearch);
      checkLastHits = Math.ceil(data.totalHits / infoAPI.PAGE_SIZE);
      renderImages(data.hits);

      if (newInfoApi.page === checkLastHits) {
        loadMore.classList.add('visually-hidden');
        iziToast.info({
          position: 'topRight',
          message: `We're sorry, but you've reached the end of search results.`,
        });
      } else {
        loadMore.classList.remove('visually-hidden');
      }
    } catch {
      loadMore.classList.add('visually-hidden');
      loader.classList.add('visually-hidden');
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
  } else {
    iziToast.error({
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  }
}

async function addNewInfo() {
  loader.classList.remove('visually-hidden');
  loadMore.classList.add('visually-hidden');

  if (newInfoApi.page < checkLastHits) {
    loadMore.classList.remove('visually-hidden');
    newInfoApi.page += 1;
    const data = await newInfoApi.getInfoArticles();
    renderImages(data.hits);

    const heightElement = document.querySelector('.gallery-item');
    const height = heightElement.getBoundingClientRect();

    window.scrollBy({
      top: height.height * 2,
      behavior: 'smooth',
    });
  }

  if (newInfoApi.page === checkLastHits) {
    loadMore.classList.add('visually-hidden');
    iziToast.info({
      position: 'topRight',
      message: `We're sorry, but you've reached the end of search results.`,
    });
  }
}
