import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

export default function renderImages(images) {
  loader.classList.add('visually-hidden');
  const markup = images
    .map(img => {
      return `<li class="gallery-item">
		   <a class="gallery-link" href=${img.largeImageURL}>
			   <img class="gallery-image" src=${img.webformatURL} alt="${img.tags}" />
		   </a>
		   <div class="container">
			   <div class="container-text"><h3 class="titel-text">Likes</h3><p class="text">${img.likes}</p></div>
			   <div class="container-text"><h3 class="titel-text">Views</h3><p class="text">${img.views}</p></div>
			   <div class="container-text"><h3 class="titel-text">Comments</h3><p class="text">${img.comments}</p></div>
			   <div class="container-text"><h3 class="titel-text">Dowloads</h3><p class="text">${img.downloads}</p></div>
		   </div>
	   </li>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  let galleryModalWindow = new SimpleLightbox('.gallery-link', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });

  galleryModalWindow.refresh();
}
