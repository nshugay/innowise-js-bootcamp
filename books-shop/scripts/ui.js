// cart.js (оптимизированный и сокращенный код с сохранением всех проверок и функциональности)

import { SVGS, CLASSNAMES, SELECTORS } from '../scripts/constants.js';
import { getCart } from '../scripts/utils.js';

export const starFilled = SVGS.starFilledSvg;
export const starNull = SVGS.starNullSvg;

// функция для присвоения звезд по рейтингу
export const renderStars = (stars) => {
    if (typeof stars !== 'number' || isNaN(stars) || stars < 0) {
        console.warn('renderStars: invalid stars, defaulting to 0');
        stars = 0; // по дефолту, если рейтинг не определен неявно
    };

    try {
        return Array.from({ length: 5 }, (_, i) => i < stars ? starFilled : starNull).join(''); // рендеринг по условию без цикла
    } catch (e) {
        console.error('Error rendering stars:', e);
        return '';
    }
};

// сетаем состояние кнопки по клику
export const setButtonState = (button, isAdded) => {
    if (!button || !(button instanceof Element)) {
        console.warn('setButtonState: invalid button');
        return;
    };

    if (typeof isAdded !== 'boolean') {
        console.warn('setButtonState: isAdded not boolean, defaulting to false');
        isAdded = false;
    };

    try {
        button.innerHTML = `${SVGS.addButtonSvg}${isAdded ? 'Added To Cart' : 'Add To Cart'}`;
        button.classList.toggle(CLASSNAMES.addedToCartButton, isAdded);
    } catch (e) {
        console.error('Error setting button state:', e);
    };
};

// цифра в хедере
export const updateCartIndicator = () => {
    try {
        const cart = getCart();

        if (!Array.isArray(cart)) {
            console.warn('updateCartIndicator: cart not array');
            return;
        };

        const indicator = document.querySelector(SELECTORS.indicator);

        if (indicator) indicator.textContent = cart.length;

        else console.warn('updateCartIndicator: indicator not found');
    } catch (e) {
        console.error('Error updating cart indicator:', e);
    };
};

// счетчики в корзине
export const updateCartUI = () => {
    try {
        updateTotalSum();
        updateCartCount();
    } catch (e) {
        console.error('Error updating cart UI:', e);
    }
};

// функция для обновления итога покупки с учетом shipping
const updateTotalSum = () => {
    try {
        const cart = getCart();

        if (!Array.isArray(cart)) {
            console.warn('updateTotalSum: cart not array');
            return;
        };

        const subTotalSum = cart.reduce((sum, book) => sum + (book?.price || 0), 0);

        const subTotalElement = document.querySelector(SELECTORS.subtotal);

        if (subTotalElement) subTotalElement.textContent = `$${subTotalSum.toFixed(2)}`;

        const shippingElement = document.querySelector(SELECTORS.shipping);
        const freeShipElement = document.querySelector(SELECTORS.freeShipping);

        let freeShipValue = 0;

        if (freeShipElement?.textContent) {
            try {
                freeShipValue = parseFloat(freeShipElement.textContent.replace(/[^\d.-]/g, '')) || 0;
            } catch (e) {
                console.error('Error parsing free shipping:', e);
            };
        };

        const shippingCost = subTotalSum > freeShipValue ? 0 : 9.99;
        if (shippingElement) shippingElement.textContent = `$${shippingCost.toFixed(2)}`;

        const total = subTotalSum + shippingCost;
        const totalElement = document.querySelector(SELECTORS.total);

        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    } catch (e) {
        console.error('Error updating total sum:', e);
    };
};

// функция для обновления счетчика товаров в корзине
const updateCartCount = () => {
    try {
        const cart = getCart();
        if (!Array.isArray(cart)) {
            console.warn('updateCartCount: cart not array');
            return;
        };
        const cartCountElement = document.querySelector(SELECTORS.cartItemsNumber);
        if (cartCountElement) cartCountElement.textContent = `${cart.length} ${cart.length === 1 ? 'item' : 'items'}`;
        else console.warn('updateCartCount: element not found');
    } catch (e) {
        console.error('Error updating cart count:', e);
    }
};

// burger
const burgerToCross = (burgerLinePrimary, burgerLineSecondary) => {
    burgerLinePrimary.classList.toggle('burger__line_primary_active');
    burgerLineSecondary.classList.toggle('burger__line_secondary_active');
};

const crossToBurger = (burgerLinePrimary, burgerLineSecondary) => {
    burgerLinePrimary.classList.remove('burger__line_primary_active');
    burgerLineSecondary.classList.remove('burger__line_secondary_active');
};

const openNavigation = (navigation, html, burgerLinePrimary, burgerLineSecondary) => {
    burgerToCross(burgerLinePrimary, burgerLineSecondary);
    navigation.classList.toggle('nav__list_active');
    html.classList.toggle('no-scroll');
};

const closeNavigation = (navigation, html, burgerLinePrimary, burgerLineSecondary) => {
    crossToBurger(burgerLinePrimary, burgerLineSecondary);
    navigation.classList.remove('nav__list_active');
    html.classList.remove('no-scroll');
};

// экспорт функции инициализации бургер-меню
export const initBurgerMenu = () => {
    // burger
    const burger = document.querySelector(SELECTORS.burger);
    const burgerLinePrimary = document.querySelector(SELECTORS.burgerLinePrimary);
    const burgerLineSecondary = document.querySelector(SELECTORS.burgerLineSecondary);
    // nav
    const navigation = document.querySelector(SELECTORS.navigation);
    const links = document.querySelectorAll(SELECTORS.links);
    const html = document.querySelector(SELECTORS.html);

    burger.addEventListener('click', () => openNavigation(navigation, html, burgerLinePrimary, burgerLineSecondary));

    navigation.addEventListener('click', () => closeNavigation(navigation, html, burgerLinePrimary, burgerLineSecondary));
    links.forEach(link => link.addEventListener('click', () => closeNavigation(navigation, html, burgerLinePrimary, burgerLineSecondary)));

};