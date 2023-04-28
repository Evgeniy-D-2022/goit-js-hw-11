import axios from "axios";
import Notiflix from "notiflix";

const URL = 'https://pixabay.com/api/';
const API_KEY = '35854540-bba533f8f1dc090f652d8ed86';

export default class createImage {
   
    constructor() {
        this.heading = '';
        this.page = 1;
    }

async getImage() {
    try {
        const response = await axios.get(`${URL}`, {
            params: {
                key: API_KEY,
                q: this.heading,
                page: this.page,
                per_page: 40,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
            },
        });
        return response.data;
    } catch (err) {
        if (err.message === '404') {
            Notiflix.Notify.failure('Error');            
        }
    }
}


    incrementPage() {
    this.page += 1;
    }

    resetPage() {
    this.page =1;
    }
}
