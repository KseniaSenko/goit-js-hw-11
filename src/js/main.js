import fetchImages from "./fetchImages";
import iconClose from "../img/icon-close.svg";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const Refs = {
    formSearch: document.querySelector('.form-search'),
    galleryList: document.querySelector('.gallery'),
}
const { formSearch, galleryList, loader} = Refs;
 
formSearch.addEventListener('submit', onFormSubmit);
galleryList.addEventListener('click', onImgClick);
function onFormSubmit(e) {
    e.preventDefault();
    const inputValue = formSearch.elements.query.value.trim();
    galleryList.innerHTML = '';
    if (inputValue !== '') {
        return fetchImages(inputValue)
            .then(data => {
                if (data.hits.length === 0) {
                     iziToast.error({
                         id: 'errorMsg',
                         iconUrl: iconClose,
                         iconColor: 'white',
                         message: 'Sorry, there are no images matching your search query. Please try again!',
                         timeout: 4000,
                         position: 'topRight',
                         backgroundColor: '#ef4040',
                         progressBarColor: '#b51b1b',
                     })
                    
                } else {
                    const markup = data.hits.map(image => imagesTemplate(image)).join('');
                    galleryList.insertAdjacentHTML('beforeend', markup)
                    formSearch.elements.query.value = '';
                }
            })
            .catch(error => {
               console.error('Error fetching images:', error);
            })
        
    }
    
}
function onImgClick(e) {
    e.preventDefault();
    const gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
  captionDelay: 250,
    })
    gallery.refresh();
}
function imagesTemplate({webformatURL,largeImageURL, tags, likes, views, comments, downloads}) {
    return `<li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" width="360" height="300"/></a>
    <ul class="gallery-img-info">
    <li class="gallery-img-likes">Likes ${likes}</li>
    <li class="gallery-img-views">Views ${views}</li>
    <li class="gallery-img-comments">Comments ${comments}</li>
    <li class="gallery-img-downloads">Downloads ${downloads}</li>
    </ul>
    </li>`;
}
// function renderImage(images) {
//     // fetchImages(event).then(images => {
//     //      const markup = q.hits.map(hit => imagesTemplate(hit)).join('');
//     // // galleryList.insertAdjacentHTML('beforeend', markup);
//     // })
//     const markup = images.hits.map(image => imagesTemplate(image)).join('');
//     galleryList.insertAdjacentHTML('beforeend', markup);
// }
