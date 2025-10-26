import { 
    SVGS, 
    CLASSNAMES, 
    SELECTORS,
    OPTIONS as scrollOptionsObj,
    CONTAINERS as containersMap 
} from '../scripts/constants.js';

import {
    debounce,
    filterBooksByQuery,
    highlightText,
    enableWheelScroll,
    updateCartItemQuantity
} from '../scripts/utils.js';

import { stateManager } from '../scripts/state.js';

// Функция для рендеринга звезд по рейтингу
export const renderStars = (stars) => {
    if (typeof stars !== 'number' || isNaN(stars) || stars < 0) {
        console.warn('renderStars: invalid stars, defaulting to 0');
        stars = 0;
    };

    try {
        return Array.from({ length: 5 }, (_, i) => i < stars ? SELECTORS.starFilled : SELECTORS.starNull).join('');
    } catch (e) {
        console.error('Error rendering stars:', e);
        return '';
    };
};

// Функция для генерации HTML карточки книги
export const generateCardHTML = (book) => {
    return `
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
    </div>
    `;
};

// Функция для генерации HTML элемента корзины
export const generateCartItemHTML = (book) => {
    return `
    <img class="order__image" src="${book.image}" alt="${book.title}">
    <div class="cart__list-item-info">
        <div class="order__content">
            <p class="h4 order__name">${book.title}</p>
            <p class="order__book-author-name">${book.author}</p>
            <div class="card__stars">${renderStars(book.stars)}</div>
        </div>
        <div class="counter__wrapper">
            <div class="cart__list-item__counter">
                <button type="button" class="counter__button">
                    <span role="presentation" class="counter-icon-min">${SELECTORS.minIcon}</span>
                </button>
                <input class="counter-input" max="99" min="1" id="${book.id}" value="1">
                <button type="button" class="counter__button">
                    <span role="presentation" class="counter-icon-plus">${SELECTORS.plusIcon}</span>
                </button>
            </div>
            <div class="price__wrapper">
                <span class="cart__price">
                    <span class="item-currency-value">$</span>
                    <span class="item-price-value">${book.price.toFixed(2)}</span>
                </span>
                <div class="bin__wrapper">${SELECTORS.binIcon}</div>
            </div>
        </div>
    </div>
    `;
};

// Функция для генерации элемента ошибки поиска
export const generateSearchErrorElement = () => {
    const searchErrorEl = document.createElement('li');
    searchErrorEl.className = 'h3 oops';
    
    const oopsText = document.createElement('span');
    oopsText.className = 'oops__try';
    oopsText.textContent = 'Nothing found for your request :( Try searching using other words.';
    
    searchErrorEl.textContent = 'Oops! ';
    searchErrorEl.appendChild(document.createElement('br'));
    searchErrorEl.appendChild(oopsText);
    
    return searchErrorEl;
};

// Функция для установки состояния кнопки добавления в корзину
export const setButtonState = (button, isAdded) => {
    try {
        button.innerHTML = `${SVGS.addButtonSvg}${isAdded ? 'Added To Cart' : 'Add To Cart'}`;
        button.classList.toggle(CLASSNAMES.addedToCartButton, isAdded);
    } catch (e) {
        console.error('err', e);
    };
};

// Функция для обновления индикатора количества товаров в корзине в заголовке
export const updateCartIndicator = () => {
    try {
        const cart = stateManager.getState().cart;

        if (!Array.isArray(cart)) {
            console.warn('err');
            return;
        };

        const totalItems = cart.reduce((sum, item) => sum + (item?.quantity || 0), 0);
        const indicator = document.querySelector(SELECTORS.indicator);

        if (indicator) indicator.textContent = totalItems;

    } catch (e) {
        console.error('err', e);
    };
};

// Функция для обновления общего интерфейса корзины
export const updateCartUI = () => {
    try {
        updateTotalSum();
        updateCartCount();
    } catch (e) {
        console.error('err', e);
    };
};

// Функция для обновления итоговой суммы покупки с учетом доставки
const updateTotalSum = () => {
    try {
        const cart = stateManager.getState().cart;

        if (!Array.isArray(cart)) {
            console.warn('cart is not array');
            return;
        };

        const subTotalSum = cart.reduce((sum, book) => sum + ((book?.price || 0) * (book?.quantity || 0)), 0);

        const subTotalElement = document.querySelector(SELECTORS.subtotal);

        if (subTotalElement) subTotalElement.textContent = `$${subTotalSum.toFixed(2)}`;

        const shippingElement = document.querySelector(SELECTORS.shipping);
        const freeShipElement = document.querySelector(SELECTORS.freeShipping);

        let freeShipValue = 0;

        if (freeShipElement?.textContent) {
            try {
                freeShipValue = parseFloat(freeShipElement.textContent.replace(/[^\d.-]/g, '')) || 0;
            } catch (e) {
                console.error('err', e);
            };
        };

        const shippingCost = subTotalSum > freeShipValue ? 0 : 9.99;
        if (shippingElement) shippingElement.textContent = `$${shippingCost.toFixed(2)}`;

        const total = subTotalSum + shippingCost;
        const totalElement = document.querySelector(SELECTORS.total);

        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    } catch (e) {
        console.error('err', e);
    };
};

// Функция для обновления счетчика товаров в корзине
const updateCartCount = () => {
    try {
        const cart = stateManager.getState().cart;
        if (!Array.isArray(cart)) {
            console.warn('cart is not array');
            return;
        };
        
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        
        const cartCountElement = document.querySelector(SELECTORS.cartItemsNumber);
        if (cartCountElement) {
            cartCountElement.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
        }
        
    } catch (e) {
        console.error('Error updating cart count:', e);
    };
};

// Функция для анимации бургер-меню в крест
const burgerToCross = (burgerLinePrimary, burgerLineSecondary) => {
    burgerLinePrimary.classList.toggle(CLASSNAMES.burgerLinePrimary);
    burgerLineSecondary.classList.toggle(CLASSNAMES.burgerLineSecondary);
};

// Функция для анимации креста в бургер-меню
const crossToBurger = (burgerLinePrimary, burgerLineSecondary) => {
    burgerLinePrimary.classList.remove(CLASSNAMES.burgerLinePrimary);
    burgerLineSecondary.classList.remove(CLASSNAMES.burgerLineSecondary);
};

// Функция для открытия навигации
const openNavigation = (navigation, html, burgerLinePrimary, burgerLineSecondary) => {
    burgerToCross(burgerLinePrimary, burgerLineSecondary);
    navigation.classList.toggle(CLASSNAMES.navTabletActive);
    html.classList.toggle(CLASSNAMES.noScroll);
};

// Функция для закрытия навигации
const closeNavigation = (navigation, html, burgerLinePrimary, burgerLineSecondary) => {
    crossToBurger(burgerLinePrimary, burgerLineSecondary);
    navigation.classList.remove(CLASSNAMES.navTabletActive);
    html.classList.remove(CLASSNAMES.noScroll);
};

// Функция для обработки клика по карточке книги
const handleCardClick = (card, addButton, booksArray) => {
    card.addEventListener('click', () => {
        const bookId = card.getAttribute('data-index');

        const selectedBook = booksArray.find(book => book.id == bookId);
        if (!selectedBook) return;

        let cart = stateManager.getState().cart;

        const existingIndex = cart.findIndex(book => book.id == bookId);
        if (existingIndex === -1) {
            cart = [...cart, { ...selectedBook, quantity: 1 }];
            setButtonState(addButton, true);
        } else {
            cart = cart.filter(book => book.id != bookId);
            setButtonState(addButton, false);
        };

        stateManager.setState({ cart });
    });
};

// Функция для генерации карточки книги
const generateCard = (book, booksArray, cart) => {
    const card = document.createElement('li');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend', generateCardHTML(book));

    card.setAttribute('data-index', book.id);

    const addButton = document.createElement('button');
    addButton.classList.add('card__button', 'button');

    const isInCart = cart.some(cartBook => cartBook.id == book.id);

    setButtonState(addButton, isInCart);
    handleCardClick(card, addButton, booksArray);
    card.appendChild(addButton);

    return card;
};

// Функция для добавления карточек в контейнер
const appendCardsToContainer = (booksArray, container, allBooks, cart) => {
    const existingIds = new Set();

    Array.from(container.children).forEach(child => {
        const id = child.getAttribute('data-index');
        if (id) existingIds.add(id);
    });

    booksArray.forEach(book => {
        if (!existingIds.has(book.id)) {
            const card = generateCard(book, allBooks, cart);
            container.appendChild(card);
        }
    });
};

// Функция для обработки кнопок плюс/минус в корзине
const handleCounterButtons = (cartItem, book) => {
    const minusButton = cartItem.querySelector(SELECTORS.minusButton);
    const plusButton = cartItem.querySelector(SELECTORS.plusButton);
    const quantityInput = cartItem.querySelector(SELECTORS.quantityInput);
    const priceValue = cartItem.querySelector(SELECTORS.priceValue);
    const basePrice = book.price || 0;

    const updateQuantity = newQuantity => updateCartItemQuantity(book, quantityInput, priceValue, basePrice, newQuantity);

    minusButton.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value) || 1;
        if (currentValue > 1) {
            updateQuantity(currentValue - 1);  
        };
    });

    plusButton.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value) || 1;
        if (currentValue < 99) {
            updateQuantity(currentValue + 1); 
        };
    });

    quantityInput.addEventListener('input', () => {
        let inputValue = parseInt(quantityInput.value) || 1;
        if (inputValue < 1) inputValue = 1;
        if (inputValue > 99) inputValue = 99;
        updateQuantity(inputValue);
    });
};

// Функция для инициализации количества в корзине
const initializeCartItemQuantity = (cartItem, book) => {
    const quantityInput = cartItem.querySelector(SELECTORS.quantityInput);
    const priceValue = cartItem.querySelector(SELECTORS.priceValue);
    const basePrice = book.price || 0;

    const cart = stateManager.getState().cart;
    const existingItem = cart.find(item => item.id === book.id);
    let initialQuantity = existingItem && existingItem.quantity !== undefined ? parseInt(existingItem.quantity) || 1 : 1;

    quantityInput.value = initialQuantity;
    if (priceValue) {
        priceValue.textContent = (basePrice * initialQuantity).toFixed(2);
    };
};

// Функция для обработки удаления товара из корзины
const handleDeleteCartItem = (cartItem, book) => {
    const deleteButton = cartItem.querySelector(SELECTORS.bin);
    deleteButton.addEventListener('click', () => {
        const cart = stateManager.getState().cart;
        const updatedCart = cart.filter(item => item.id !== book.id);
        stateManager.setState({ cart: updatedCart });
        
        cartItem.remove();
    });
};

// Функция для генерации элементов корзины
export const generateCartItems = (cartListElement) => {
    if (!cartListElement) {
        return;
    };

    while (cartListElement.firstChild) {
        cartListElement.removeChild(cartListElement.firstChild);
    };

    const cart = stateManager.getState().cart;

    cart.forEach(book => {
        const cartItem = document.createElement('li');
        cartItem.className = SELECTORS.cartItem;
        cartItem.insertAdjacentHTML('beforeend', generateCartItemHTML(book));
        cartListElement.appendChild(cartItem);

        handleCounterButtons(cartItem, book);
        initializeCartItemQuantity(cartItem, book);
        handleDeleteCartItem(cartItem, book);
    });
};

// Функция для инициализации контейнеров страниц
export const initializePages = (books, containersMap) => {
    const currentYear = new Date().getFullYear();
    const scrollOptions = scrollOptionsObj;

    const cart = stateManager.getState().cart;

    Object.entries(containersMap).forEach(([key, container]) => {
        if (!container) return;

        let filteredBooks;

        switch (key) {
            case 'newReleases': {
                filteredBooks = books.filter(book => book.year === currentYear);
                break;
            };
            case 'topRated': {
                filteredBooks = books.filter(book => book.stars > 4);
                break;
            };
            case 'ourSuggestion': {
                filteredBooks = books.filter(book => book.price < 20);
                break;
            };
            case 'mostPopular': {
                filteredBooks = books;
                break;
            };
            case 'bestSeller': {
                filteredBooks = books;
                break;
            };
            default: {
                return;
            };
        };

        appendCardsToContainer(filteredBooks, container, books, cart);
        enableWheelScroll(container.parentElement, scrollOptions);
    });
};

// Функция для отображения результатов поиска
const showSearchResults = (query, books, searchResultsSection, searchResultsContainer) => { 
    if (!query) {
        searchResultsSection.style.display = 'none';

        while (searchResultsContainer.firstChild) {
            searchResultsContainer.removeChild(searchResultsContainer.firstChild);
        }
        return;
    };

    const cart = stateManager.getState().cart;

    const filteredBooks = filterBooksByQuery(query, books);

    while (searchResultsContainer.firstChild) {
        searchResultsContainer.removeChild(searchResultsContainer.firstChild);
    };

    if (filteredBooks.length === 0) {
        const searchErrorElement = generateSearchErrorElement();
        searchResultsContainer.appendChild(searchErrorElement);
    } else {
        filteredBooks.forEach(book => {
            const card = generateCard(book, books, cart);
            searchResultsContainer.appendChild(card);

            const titleElement = card.querySelector(SELECTORS.bookTitle);
            const authorElement = card.querySelector(SELECTORS.bookAuthorName);
            const descriptionElement = card.querySelector(SELECTORS.bookArticle);

            const highlightElement = (element) => {
                if (!element) return;
                if (!element.dataset.original) element.dataset.original = element.textContent;
                element.textContent = '';
                const highlightedParts = highlightText(element.dataset.original, query);
                element.insertAdjacentHTML('beforeend', highlightedParts);
            };

            highlightElement(titleElement);
            highlightElement(authorElement);
            highlightElement(descriptionElement);
        });
    };

    enableWheelScroll(searchResultsContainer.parentElement, scrollOptionsObj);
    searchResultsSection.style.display = 'block';
};

// Функция для инициализации поиска
export const initializeSearch = (books, searchResultsSection, searchResultsContainer, searchInput) => {
    if (!searchInput) {
        return;
    };

    const debouncedShowResults = debounce(query => showSearchResults(query, books, searchResultsSection, searchResultsContainer), 500);

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        debouncedShowResults(query);
    });
};

// Функция для инициализации бургер-меню
export const initBurgerMenu = () => {
    const burger = document.querySelector(SELECTORS.burger);
    const burgerLinePrimary = document.querySelector(SELECTORS.burgerLinePrimary);
    const burgerLineSecondary = document.querySelector(SELECTORS.burgerLineSecondary);
    const navigation = document.querySelector(SELECTORS.navigation);
    const links = document.querySelectorAll(SELECTORS.links);
    const html = document.querySelector(SELECTORS.html);

    burger.addEventListener('click', () => openNavigation(navigation, html, burgerLinePrimary, burgerLineSecondary));

    navigation.addEventListener('click', () => closeNavigation(navigation, html, burgerLinePrimary, burgerLineSecondary));
    links.forEach(link => link.addEventListener('click', () => closeNavigation(navigation, html, burgerLinePrimary, burgerLineSecondary)));
};

// Функция для инициализации UI-компонентов (контейнеры + поиск)
export const initUI = (books) => {
    const searchResultsSection = document.querySelector(SELECTORS.searchContainer);
    const searchResultsContainer = document.getElementById(SELECTORS.searchSection);
    const searchInput = document.getElementById(SELECTORS.searchArea);

    initializeSearch(books, searchResultsSection, searchResultsContainer, searchInput);
    initializePages(books, containersMap);
};