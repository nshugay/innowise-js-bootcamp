'use strict';

// утилиты
import {
    getCart,
    setCart,
    debounce,
    filterBooksByQuery,
    highlightText,
    enableWheelScroll
} from './scripts/utils.js';

// ui-функции
import {
    updateCartIndicator,
    updateCartUI,
    renderStars,
    setButtonState
} from './scripts/ui.js';


// константы
import { SELECTORS, SVGS } from './scripts/constants.js';


// глобальная переменная для книг
let books = [];

// функция для загрузки книг из api
async function loadBooksFromAPI() {
    try {
        const response = await fetch('http://localhost:3000/books'); // внешний api
        if (!response.ok) throw new Error('API не доступен');

        const data = await response.json();
        return data;

    } catch (error) {

        console.warn('Ошибка загрузки книг из API:', error);
        return [];

    };
};

// асинхронная функция инициализации
async function init() {
    if (!window.location.pathname.endsWith('cart.html')) {
        books = await loadBooksFromAPI();
    };

    // генерация карточек
    const generateCards = (book) => {  
        const card = document.createElement('li');
        card.className = `card`;
        card.innerHTML = `
        <img class="card__background" src="${book.image}" alt="${book.title}">
        <span class="price">
            <span class="item-currency">$</span>
            <span class="item-price-value">${book.price.toFixed(2)}</span>
        </span>
        <div class="card__content">
            <p class="card__name">${book.title}</p>
            <div class="card__book-info">
                <p class="card__book-author-name">${book.author}</p>
                <span>&nbsp;•&nbsp;</span>
                <div class="card__stars">
                    ${renderStars(book.stars)}
                </div>  
            </div>
            <p class="card__article">${book.description}</p>
        </div>`;

        const addButton = document.createElement('button');
        addButton.classList.add('card__button', 'button');
        addButton.setAttribute('data-index', book.id);

        const cart = getCart();
        const isInCart = cart.some(b => b.id == book.id);
        setButtonState(addButton, isInCart); 

        addButton.addEventListener('click', () => { 
            const bookId = addButton.getAttribute('data-index');
            const selectedBook = books.find(b => b.id == bookId); // Теперь ищет в загруженных books
            if (!selectedBook) return;

            let cart = getCart();
            const existingIndex = cart.findIndex(b => b.id == bookId);

            if (existingIndex === -1) {
                cart.push(selectedBook);
                setButtonState(addButton, true);
            } else {
                cart.splice(existingIndex, 1);
                setButtonState(addButton, false);
            };
        
            setCart(cart);
            updateCartIndicator();
        });

        card.appendChild(addButton);
        return card;
    };

    const appendCards = (dataArray, container) => {
        container.innerHTML = '';
        
        dataArray.forEach((book) => {  
            const card = generateCards(book); 
            container.append(card);
        });
    };

    if (window.location.pathname.endsWith('cart.html')) {
        const generateCartItem = (i) => {
            const cartSection = document.querySelector('.cart__list');
            cartSection.innerHTML = '';

            const cart = getCart(); 

            cart.forEach((book, index) => {
                const cartItem = document.createElement('li');
                cartItem.className = 'cart__list-item';
                cartItem.innerHTML = `
                <img class="order__image" src="${book.image}" alt="${book.title}">
                <div class="cart__list-item-info">
                    <div class="order__content">
                        <p class="h4 order__name">${book.title}</p>
                        <p class="order__book-author-name">${book.author}</p>
                        <div class="card__stars">${renderStars(book.stars)}</div>
                    </div>
                    <div class="price__wrapper">
                        <span class="cart__price">
                            <span class="item-currency-value">$</span>
                            <span class="item-price-value">${book.price.toFixed(2)}</span>
                        </span>
                            <div class="bin__wrapper">${SVGS.binSvg}</div>
                        </div>
                    </div>
                `;
                cartSection.appendChild(cartItem);

                const deleteButton = cartItem.querySelector('.bin__wrapper'); 
                deleteButton.addEventListener('click', () => {
                    const updatedCart = cart.filter(item => item.id !== book.id);
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                    
                    generateCartItem();
                    updateCartIndicator();
                    updateCartUI();
                });
            });        
        };
        
        window.onload = generateCartItem;
    };

    const topRatedContainer = document.querySelector(SELECTORS.topRatedContainer);
    const ourSuggestionContainer = document.querySelector(SELECTORS.ourSuggestionContainer);
    const mostPopularContainer = document.querySelector(SELECTORS.mostPopularContainer);
    const bestSellerContainer = document.querySelector(SELECTORS.bestSellerContainer);
    const newReleasesContainer = document.querySelector(SELECTORS.newReleasesContainer);

    const currentYear = new Date().getFullYear();

    let options = { 
        autoScroll: true, 
        interval: 3000, 
        scrollDistance: 272 
    }; 

    if (window.location.pathname.endsWith('explore.html')) {
        const newReleasesBooks = books.filter(book => book.year === currentYear);
        const topRatedBooks = books.filter(book => book.stars >= 4);
        const ourSuggestionBooks = books.filter(book => book.price < 20);

        appendCards(newReleasesBooks, newReleasesContainer);
        enableWheelScroll(newReleasesContainer.parentElement, options); 

        appendCards(topRatedBooks, topRatedContainer);
        enableWheelScroll(topRatedContainer.parentElement, options);  

        appendCards(ourSuggestionBooks, ourSuggestionContainer);
        enableWheelScroll(ourSuggestionContainer.parentElement, options);  

        appendCards(books, mostPopularContainer);
        enableWheelScroll(mostPopularContainer.parentElement, options);  
    };

    if (window.location.pathname.endsWith('index.html')) {
        const newReleasesBooks = books.filter(book => book.year === currentYear);

        appendCards(books, bestSellerContainer);
        enableWheelScroll(bestSellerContainer.parentElement, options); 

        appendCards(newReleasesBooks, newReleasesContainer);
        enableWheelScroll(newReleasesContainer.parentElement, options); 
    };
        
    const showSearchResults = (query) => {
        const searchResultsSection = document.querySelector(SELECTORS.searchContainer);
        const searchResultsContainer = document.getElementById(SELECTORS.searchSection);

        if (!query) {
            searchResultsSection.style.display = 'none';
            searchResultsContainer.innerHTML = '';
            return;
        };

        const filteredBooks = filterBooksByQuery(query, books); // Используем загруженные books

        searchResultsContainer.innerHTML = '';

        if (filteredBooks.length === 0) {
            searchResultsContainer.innerHTML = `<li class="h3 oops">Oops! Nothing found for your request :( <br> <span class="oops__try">Try searching using other words.</span></li>`;
        } else {
            filteredBooks.forEach(book => {
                const card = generateCards(book);
                searchResultsContainer.appendChild(card);

                const titleEl = card.querySelector('.card__name');
                const authorEl = card.querySelector('.card__book-author-name');
                const descEl = card.querySelector('.card__article');

                if (titleEl) {
                    if (!titleEl.dataset.original) titleEl.dataset.original = titleEl.textContent;
                    titleEl.innerHTML = highlightText(titleEl.dataset.original, query);
                };

                if (authorEl) {
                    if (!authorEl.dataset.original) authorEl.dataset.original = authorEl.textContent;
                    authorEl.innerHTML = highlightText(authorEl.dataset.original, query);
                };

                if (descEl) {
                    if (!descEl.dataset.original) descEl.dataset.original = descEl.textContent;
                    descEl.innerHTML = highlightText(descEl.dataset.original, query);
                };
            });
        };

        enableWheelScroll(searchResultsContainer.parentElement, options); 
        searchResultsSection.style.display = 'block';
    };

    const searchInput = document.getElementById(SELECTORS.searchArea);

    if (searchInput) {
        const debouncedShowResults = debounce((query) => {
            showSearchResults(query);
        }, 500);  

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim();
            debouncedShowResults(query);  
        });
    };
};

document.addEventListener('DOMContentLoaded', () => {
    // localStorage.removeItem('cart'); 
    init(); 
});

window.addEventListener('load', () => {
    updateCartIndicator();
    updateCartUI();
});