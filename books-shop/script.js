'use strict';
import { loadBooksFromAPI } from './scripts/api.js';

import { stateManager } from './scripts/state.js';

import {
    updateCartIndicator,
    updateCartUI,
    initBurgerMenu,
    initUI,
    generateCartItems
} from './scripts/ui.js';

import { SELECTORS 
} from './scripts/constants.js';

const init = async () => {
    try {
        const books = await loadBooksFromAPI();
        stateManager.setState({ books });

        initUI(books);

        const cartListElement = document.querySelector(SELECTORS.cartList);

        generateCartItems(cartListElement);

        initBurgerMenu();

        stateManager.subscribe((newState) => {
            updateCartIndicator();
            updateCartUI();
            generateCartItems(cartListElement);
        });

    } catch (e) {
        console.error('err:', e);
    };
};

document.addEventListener('DOMContentLoaded', () => {
    init();
});

window.addEventListener('load', () => {
    document.getElementById('preloader').style.display = 'none';
    initBurgerMenu();
    updateCartIndicator();
    updateCartUI();
});
