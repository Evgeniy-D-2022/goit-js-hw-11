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


