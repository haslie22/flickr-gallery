import requestData from '../info/request-info.json';
import { getInfoFromAPI } from "./api";
import { Card } from "./card";

class Gallery {
  constructor(container) {
    this.container = container;

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
    window.addEventListener('scroll', () => this.checkScroll());
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

    await this.fill();
  }

  async fill() {
    if (!this.isLoading) return;

    const cardsData = await getInfoFromAPI(requestData, this.currentPage);
    this.totalPages = cardsData.photos.pages;

    for (const photoData of cardsData.photos.photo) {
      const card = new Card(photoData);
      this.gallery.append(await card.create());
    }
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
        this.isLoading = false;
        this.handleLoader();
      }, 1000);
    }
  }
}

export { Gallery };