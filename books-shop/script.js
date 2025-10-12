import { updateCartIndicator } from "./scripts/cart.js";
import { books } from "./scripts/books.js";
import * as UI from "./scripts/ui.js";

document.addEventListener('DOMContentLoaded', () => {
    //localStorage.removeItem('cart');

// функция для присвоения звезд по рейтингу
const renderStars = (stars) => {
  const maxRating = 5;
  let starsHTML = '';

  for (let i = 1; i <= maxRating; i++) {
    if (i <= stars) {
      starsHTML += UI.starFilled;
    } else {
      starsHTML += UI.starNull;
    };
  };

  return starsHTML;
};

// генерация карточек
const generateCards = (book) => {  // book - объект с свойствами: id, title, author, price, stars, description, image, year
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
    addButton.innerHTML = `${UI.addButtonHTML}Add To Cart`;

    addButton.addEventListener('click', () => { 
        const bookId = addButton.getAttribute('data-index');
        const selectedBook = books.find(b => b.id == bookId);  // ищем книгу по id в массиве books
        if (!selectedBook) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // проверка на дубликаты
        if (!cart.some(b => b.id == bookId)) {
            cart.push(selectedBook);
            localStorage.setItem('cart', JSON.stringify(cart));
        };

        addButton.style.backgroundColor = 'var(--color-active-button)'; 
        addButton.innerHTML = `${UI.addButtonHTML}Added To Cart`;
        addButton.disabled = true;
        updateCartIndicator();
    });

    card.appendChild(addButton);
    return card;
};


if (window.location.pathname.endsWith('cart.html')) {

    const generateCartItem = (i) => {
        const cartSection = document.querySelector('.cart__list');
        cartSection.innerHTML = '';

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart.forEach((book, i) => {

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
                        <div class="bin__wrapper">${UI.binIcon}</div>
                    </div>
                </div>
            `
            cartSection.appendChild(cartItem);

            const deleteButton = cartItem.querySelector('.bin__wrapper'); 
            deleteButton.addEventListener('click', () => {
                cart.splice(i, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                generateCartItem();
                updateCartIndicator();
            });
        });        
    };
    
    // localStorage.clear()

    window.onload = generateCartItem;
};



window.addEventListener('load', () => {
    updateCartIndicator();
});


const appendCards = (dataArray, container) => {
    container.innerHTML = '';
    
    dataArray.forEach((book) => {  
        const card = generateCards(book); 
        container.append(card);
    });
};

// переменные разных контейнеров
const topRatedContainer = document.querySelector('#top-rated');
const ourSuggestionContainer = document.querySelector('#our-suggestion');
const mostPopularContainer = document.querySelector('#most-popular');
const bestSellerContainer = document.querySelector('#best-seller-books');
const newReleasesContainer = document.querySelector('#new-releases');

const currentYear = new Date().getFullYear();


if (window.location.pathname.endsWith('explore.html')) {
    // фильтры для каждого контейнера 
    const newReleasesBooks = books.filter(book => book.year === currentYear);  // новые издания: год = текущий
    const topRatedBooks = books.filter(book => book.stars >= 4);  // топ-рейтинговые >= 4
    const ourSuggestionBooks = books.filter(book => book.price < 20);  // цена < 20 

    appendCards(newReleasesBooks, newReleasesContainer);
    appendCards(topRatedBooks, topRatedContainer);
    appendCards(ourSuggestionBooks, ourSuggestionContainer);
    appendCards(books, mostPopularContainer);
};

if (window.location.pathname.endsWith('index.html')) {
    // фильтры для index.html
    const newReleasesBooks = books.filter(book => book.year === currentYear);

    appendCards(books, bestSellerContainer);
    appendCards(newReleasesBooks, newReleasesContainer);
};






// логика для поиска
const searchResultsSection = document.querySelector('.search__container');
const searchResultsContainer = document.getElementById('searched');

const filterBooksByQuery = (query) => {
    if (!query) return [];
    query = query.toLowerCase();

    return books.filter(book => {
        return book.title.toLowerCase().includes(query) ||
               book.author.toLowerCase().includes(query) ||
               book.description.toLowerCase().includes(query);
    });
};

// функция подсветки совпадений в тексте
const highlightText = (text, query) => {
    if (!query) return text;
    
    const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');

    return text.replace(regex, '<mark>\$1</mark>');
};

const showSearchResults = (query) => {
    if (!query) {
        // cкрыть контейнер 
        searchResultsSection.style.display = 'none';
        searchResultsContainer.innerHTML = '';
        return;
    };

    const filteredBooks = filterBooksByQuery(query);

    searchResultsContainer.innerHTML = '';

    if (filteredBooks.length === 0) {
        searchResultsContainer.innerHTML = `<li class="h3 oops">Oops! Nothing found for your request :( <br> <span class="oops__try">Try searching using other words.</span></li>`;
    } else {
        // добавляем карточки для каждого найденного
        filteredBooks.forEach(book => {
            const card = generateCards(book);
            searchResultsContainer.appendChild(card);

            // подсветка совпадений в карточке
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

    searchResultsSection.style.display = 'block';
};

// логика для инпута
const searchInput = document.getElementById('search-input');

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        showSearchResults(query);
    });
};

    
});