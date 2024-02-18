const fragment = document.createDocumentFragment();
const gallery = document.querySelector('.gallery');
export function renderFunctions(arrayImg) {
  arrayImg.forEach(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      const galleryItem = document.createElement('li');
      galleryItem.classList.add('gallery-items');

      galleryItem.insertAdjacentHTML(
        'beforeend',
        `<a class='gallery-link' href='${largeImageURL}'>
        <img class='gallery-image' src='${webformatURL}' alt='${tags}' />
        <ul class='gallery-ul'>
          <li class='gallery-item'><h3 class='gallery-title'>Likes</h3><p class='gallery-value'>${likes}</p></li>
          <li class='gallery-item'><h3 class='gallery-title'>Views</h3><p class='gallery-value'>${views}</p></li>
          <li class='gallery-item'><h3 class='gallery-title'>Comments</h3><p class='gallery-value'>${comments}</p></li>
          <li class='gallery-item'><h3 class='gallery-title'>Downloads</h3><p class='gallery-value'>${downloads}</p></li>
        </ul>
      </a>`
      );
      fragment.appendChild(galleryItem);
    }
  );

  gallery.appendChild(fragment);
}
