import requestData from '../info/request-info.json';

import { getInfoFromAPI } from "./api";
import { setLocalStorage, getLocalStorage } from './localStorage';

import { Card } from "./card";

class Gallery {
  constructor(container) {
    this.container = container;

    this.savedPics = null;

    this.gallery = null;
    this.loader = null;

    this.currentPage = 1;
    this.totalPages = null;

    this.scrollTop = null;
    this.scrollHeight = null;
    this.clientHeight = null;

    this.isLoading = true;

    this.addListeners();
    this.create();
  }

  addListeners() {
    window.addEventListener('beforeunload', () => setLocalStorage('favourites', this.savedPics));
    window.addEventListener('scroll', () => this.checkScroll());
    this.container.addEventListener('click', (e) => this.manageFavourites(e));
  }

  async create() {
    this.container.innerHTML = '';

    const gallery = document.createElement('div');
    gallery.classList.add('gallery');

    this.gallery = gallery;

    const loader = document.createElement('div');
    loader.classList.add('loader');

    for (let i = 1; i <= 3; i++) {
      const preloaderCircle = document.createElement('div');
      preloaderCircle.classList.add('loader__circle', `loader__circle${i}`);
      loader.append(preloaderCircle);
    }

    this.loader = loader;

    this.container.append(gallery, loader);

    await this.displayFavourites();
    await this.fill();
  }

  async fill() {
    if (!this.isLoading) return;

    const cardsData = await getInfoFromAPI(requestData, this.currentPage);
    this.totalPages = cardsData.photos.pages;

    for (const photoData of cardsData.photos.photo) {
      if (this.savedPics.has(photoData.id)) continue;
      const card = new Card(photoData.id, photoData.owner, photoData.url_l);
      this.gallery.append(await card.create());
    }
    this.isLoading = false;
  }

  handleLoader() {
    if (this.isLoading) {
      this.loader.classList.add('visible');
    } else {
      this.loader.classList.remove('visible');
    }
  }

  checkPage() {
    if (this.currentPage === this.totalPages) {
      this.currentPage = 1;
    }
  }

  async checkScroll() {
    this.scrollTop = document.documentElement.scrollTop;
    this.scrollHeight = document.documentElement.scrollHeight;
    this.clientHeight = document.documentElement.clientHeight;

    if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
      this.currentPage++;
      this.checkPage();
      this.isLoading = true;
      this.handleLoader();

      setTimeout(() => {
        this.fill();
        this.handleLoader();
      }, 1500);
    }
  }

  manageFavourites(e) {
    if (e.target !== e.currentTarget) {
      if (e.target.classList.contains('card__button')) {
        if (e.target.classList.contains('clicked')) {
          console.log(e.target.closest('.card').dataset.pictureid);
          this.savedPics.delete(e.target.closest('.card').dataset.id);
          e.target.classList.remove('clicked');
        } else {
          this.savedPics.add(e.target.closest('.card').dataset.id);
          e.target.classList.add('clicked');
        }
      }
    }
    e.preventDefault();
  }

  async displayFavourites() {
    this.savedPics = new Set(getLocalStorage('favourites'));

    for (let savedPicID of this.savedPics) {
      const url = `https://api.flickr.com/services/rest/?method=${requestData.methodFavourite}&api_key=${requestData.apiKey}&photo_id=${savedPicID}&format=json&nojsoncallback=${requestData.nojsoncallback}`;

      const response = await fetch(url);
      const data = await response.json();

      const photoData = data.photo;
      const photoUrl = `https://live.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`;

      const card = new Card(photoData.id, photoData.owner.nsid, photoUrl);
      this.gallery.append(await card.create(true));
    }
  }
}

export { Gallery };