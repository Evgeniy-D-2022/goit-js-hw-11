import './css/styles.css';
import Notiflix from 'notiflix';
import CreateImage from './js/api';
import LoadMoreButton from './js/load-more-btn';
import CreateImage from './js/api';

const imgForm = document.querySelector('.search-form');
const imgGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const createImage = new CreateImage();
const loadMoreButton = new LoadMoreButton({ selector: '.load-more', isHidden: true})

imgForm.addEventListener('submit', onImgForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

async function onImgForm(evt) {
    evt.preventDefault();

    loadMoreButton.show();

    createImage.heading = evt.currentTarget.elements.searchQuery.value.trim();
    createImage.resetPage();
    resetMarkup();
    await onLoadMoreBtn();

    // if (createImage.heading === '') {
    //     Notiflix.Notify.info('Enter a request');
    //     return;
    // }

    
//     loadMoreBtn.disabled();
};

async function onLoadMoreBtn() {
    try {
        loadMoreButton.disabled();
        createImage.page += 1;
        const markup = await getImgMarkup();
        createGallery(markup);
        loadMoreButton.enabled();

        if (createImage.page > 1 && createImage.page > createImage.per_page) {
            loadMoreButton.hide();
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            
        }
    } catch (err) {
        onError(err);
    }
}

async function getImgMarkup() {
    try {
        const { hits } = await createImage.getImage();
        if (hits.length === 0) throw new Error("Sorry, no results");
        return hits.reduce((markup, hit) => markup + createMarkup(hit), '');
    } catch (err) {
        console.log(err);
        onError(err);
    }
}

function createMarkup({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) {
    return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
		${likes} 
    </p>
    <p class="info-item">
      <b>Views</b>
		${views} 
    </p>
    <p class="info-item">
      <b>Comments</b>
		${comments} 
    </p>
    <p class="info-item">
      <b>Downloads</b>
		${downloads} 
    </p>
  </div>
</div>`;
}

function createGallery(markup) {
    imgGallery.insertAdjacentHTML('beforeend', markup);
}

function resetMarkup() {
    imgGallery.innerHTML = '';
}

function onError(err) {
    console.log(err);
    loadMoreButton.hide();
    resetMarkup();
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}