import fetchImages from "./fetchImages";
import iconClose from "../img/icon-close.svg";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const Refs = {
    formSearch: document.querySelector('.form-search'),
    galleryList: document.querySelector('.gallery'),
    loader: document.querySelector('.loader'),
}
const { formSearch, galleryList, loader} = Refs;
 console.log(loader);
formSearch.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();
    const inputValue = formSearch.elements.query.value.trim();

    if (inputValue === '') {
        return;
    }
    galleryList.innerHTML = '';
    loader.style.display = 'block';

    fetchImages(inputValue)
        .then(function ({ hits }) {
            if (hits.length > 0) {
                renderImage(hits)
                formSearch.elements.query.value = '';
                const gallery = new SimpleLightbox('.gallery a', {
                    captionsData: 'alt',
                    captionDelay: 250,
                })
                gallery.refresh();
            } else {
               toastError('Sorry, there are no images matching your search query. Please try again!')
            }
        })
        .catch(error => {
            toastError(`Error fetching images: ${error}`)
            }).finally(function () {
                formSearch.reset();
                loader.style.display = 'none';
            })   
}
function toastError(message) {
    iziToast.show({
        message,
         id: 'errorMsg',
    iconUrl: iconClose,
    iconColor: 'white',
    timeout: 4000,
    position: 'topRight',
    backgroundColor: '#ef4040',
    progressBarColor: '#b51b1b',
    })
}
function imagesTemplate({webformatURL,largeImageURL, tags, likes, views, comments, downloads}) {
    return `<li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" width="360"/></a>
    <ul class="gallery-img-caption">
    <li class="gallery-img-info">Likes ${likes}</li>
    <li class="gallery-img-info">Views ${views}</li>
    <li class="gallery-img-info">Comments ${comments}</li>
    <li class="gallery-img-info">Downloads ${downloads}</li>
    </ul>
    </li>`; 
}
function renderImage(images) {
    const markup = images.map(image => imagesTemplate(image)).join('');
    galleryList.insertAdjacentHTML('beforeend', markup);
}
