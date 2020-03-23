import galleryItems from './gallery-items.js';

const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const lightboxContentRef = document.querySelector('.lightbox__content');
const galleryRef = document.querySelector('.js-gallery');
const closeBtnRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const createGalleryItem = galleryItem => {
  const listItemRef = document.createElement('li');
  listItemRef.classList.add('gallery__item');

  const linkRef = document.createElement('a');
  linkRef.classList.add('gallery__link');
  linkRef.href = galleryItem.original;

  const imgRef = document.createElement('img');
  imgRef.classList.add('gallery__image', 'js-large-image');
  imgRef.src = galleryItem.preview;
  imgRef.dataset.source = galleryItem.original;
  imgRef.alt = galleryItem.description;

  linkRef.appendChild(imgRef);
  listItemRef.appendChild(linkRef);

  return listItemRef;
};

const gallery = galleryItems.map(galleryItem => createGalleryItem(galleryItem));

galleryRef.append(...gallery);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

galleryRef.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const imageRef = event.target;
  const largeImageUrl = imageRef.dataset.source;

  // Открытие модального окна по клику на элементе галереи.

  lightboxRef.classList.add('is-open');
  lightboxImageRef.src = largeImageUrl;

  closeBtnRef.addEventListener('click', onCloseModal);
  lightboxContentRef.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onPressEscape);
}

function onCloseModal() {
  closeBtnRef.removeEventListener('click', onCloseModal);
  document.removeEventListener('keydown', onPressEscape);
  lightboxRef.classList.remove('is-open');
  lightboxImageRef.src = '';
}

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
