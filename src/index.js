import './index.html';
import './style.scss';

import { Gallery } from './scripts/gallery';

const appContainer = document.querySelector('.app-container');
const gallery = new Gallery(appContainer);