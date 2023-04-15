import './index.html';
import './style.scss';

import { Gallery } from './scripts/gallery';
import { setLocalStorage, getLocalStorage } from './scripts/localStorage'

const appContainer = document.querySelector('.app-container');
const gallery = new Gallery(appContainer);
