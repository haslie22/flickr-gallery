import requestData from '../info/request-info.json';
import { getSources, getInfoFromAPI } from "./api";
import { Card } from "./card";

class Gallery {
  constructor(container) {
    this.container = container;

    this.gallery = null;
    this.data = null;

    this.create();
  }

  async getSources(callback, data) {
    const newdata = await callback(data);
    return newdata;
  }

  async create() {
    this.container.innerHTML = '';

    const gallery = document.createElement('div');
    gallery.classList.add('gallery');

    this.gallery = gallery;
    this.container.append(gallery);

    await this.fill();
  }

  async fill() {
    const cardsData = await getSources(getInfoFromAPI, requestData);
    console.log(cardsData);

    for (const photoData of cardsData.photos.photo) {
      const card = new Card(photoData);
      this.gallery.append(await card.create());
    }
  }
}

export { Gallery };