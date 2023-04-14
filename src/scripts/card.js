import requestData from '../info/request-info.json';
import { getAuthorName } from "./api";

class Card {
  constructor(cardInfo) {
    this.picture = cardInfo.url_l;
    this.ownerID = cardInfo.owner;
    this.pictureID = cardInfo.id;

    this.pictureName = null;
  }

  async create() {
    await this.getPictureData();

    const card = document.createElement('div');
    card.classList.add('card');
    card.style.backgroundImage = `url('${this.picture}')`;

    const cardInfoContainer = document.createElement('div');
    cardInfoContainer.classList.add('card__info');

    const cardAuthor = document.createElement('span');
    cardAuthor.classList.add('card__author');
    cardAuthor.textContent = this.authorName;

    const cardButton = document.createElement('button');
    cardButton.classList.add('card__button', 'button');
    cardButton.textContent = 'Favourite';

    cardInfoContainer.append(cardAuthor, cardButton);
    card.append(cardInfoContainer);

    return card;
  }

  async getPictureData() {
    const authorInfo = await getAuthorName(requestData, this.ownerID);
    try {
      this.authorName = authorInfo.person.realname._content;
    } catch {
      try {
        this.authorName = authorInfo.person.username._content;
      } catch {
        this.authorName = 'Unknown author';
      }
    }
  }
}

export { Card };