import requestData from '../info/request-info.json';
import { getAuthorName, getPictureName } from "./api";

class Card {
  constructor(id, authorID, pictureUrl) {
    this.pictureUrl = pictureUrl;
    this.authorID = authorID;
    this.id = id;
  }

  async create(isFavourite = false) {

    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = this.id;
    card.style.backgroundImage = `url('${this.pictureUrl}')`;

    const cardInfoContainer = document.createElement('div');
    cardInfoContainer.classList.add('card__info');

    const cardName = document.createElement('span');
    cardName.classList.add('card__name');
    cardName.textContent = await this.getPictureName();

    const cardAuthor = document.createElement('span');
    cardAuthor.classList.add('card__author');
    cardAuthor.textContent = await this.getAuthorName();

    const cardButton = document.createElement('button');
    cardButton.classList.add('card__button', 'button');
    if (isFavourite) {
      cardButton.classList.add('clicked');
    }
    cardButton.textContent = 'Favourite';

    cardInfoContainer.append(cardName, cardAuthor, cardButton);
    card.append(cardInfoContainer);

    return card;
  }

  async getAuthorName() {
    const authorInfo = await getAuthorName(requestData, this.authorID);
    let authorName = '';
    try {
      authorName = authorInfo.person.realname._content;
    } catch {
      try {
        authorName = authorInfo.person.username._content;
      } catch {
        authorName = 'Unknown author';
      }
    }
    return authorName;
  }

  async getPictureName() {
    const pictureInfo = await getPictureName(requestData, this.id);
    let pictureName = '';
    try {
      pictureName = pictureInfo.photo.title._content;
    } catch {
      pictureName = 'Unknown';
    }
    return pictureName;
  }
}

export { Card };