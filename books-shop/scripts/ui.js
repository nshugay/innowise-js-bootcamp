import { SVGS } from "../scripts/constants.js";

import { getCart } from "../scripts/utils.js";
export { getCart }


export const binIcon = SVGS.binSvg;

// функция для присвоения звезд по рейтингу
export const renderStars = (stars) => {
    const starFilled = SVGS.starFilledSvg;
    const starNull = SVGS.starNullSvg;

    const maxRating = 5;
    let starsHTML = '';

    for (let i = 1; i <= maxRating; i++) {
        if (i <= stars) {
        starsHTML += starFilled;
        } else {
        starsHTML += starNull;
        };
    };

  return starsHTML;
};

// сетаем состояние кнопки по клику
export const setButtonState = (button, isAdded) => {
    const cartIcon = SVGS.addButtonSvg;

    if (isAdded) {
        button.innerHTML = `${cartIcon}Added To Cart`;
        button.classList.add('added');
    } else {
        button.innerHTML = `${cartIcon}Add To Cart`;
        button.classList.remove('added');
    };
};

// цифра в хедере
export const updateCartIndicator = () => {
  const cart = getCart();  // Замените JSON.parse на getCart()
  const totalQuantity = cart.length;

  const indicator = document.querySelector('.circle__num');
  if (indicator) {
    indicator.textContent = totalQuantity;
  };
};

// счетчики в корзине
export const updateCartUI = () => {
  updateTotalSum();
  updateCartCount();
};

// функция для обновления итога покупки с учетом shopping
const updateTotalSum = () => {
    const cart = getCart(); 

    // рассчёт промежуточной суммы (subtotal)
    const subTotalSum = cart.reduce((sum, book) => sum + (book.price || 0), 0);
    const subTotalElement = document.querySelector('.subtotal'); 
    
    if (subTotalElement) {
        subTotalElement.textContent = `$${subTotalSum.toFixed(2)}`;
    };

    // получение стоимости доставки: по умолчанию 9.99$ (сетаем динамически)
    const shippingElement = document.querySelector('.shipping');
    let shippingCost = 9.99; 

    // получение порога для бесплатной доставки
    const freeShipElement = document.querySelector('#free-shipping-value');
    let freeShipValue = 0;  // если не найден, всегда платная доставка

    if (freeShipElement) {
        freeShipValue = parseFloat(freeShipElement.textContent.replace(/[^\d.-]/g, '')) || 0;
    };

    // логика переключения доставки
    if (subTotalSum > freeShipValue) {
        shippingCost = 0;  
    } else {
        shippingCost = 9.99;  
    };

    // oбновление текста элемента доставки для синхронизации UI
    if (shippingElement) {
        shippingElement.textContent = `$${shippingCost.toFixed(2)}`;
    };

    // pассчёт итоговой суммы
    const total = subTotalSum + shippingCost;
    const totalElement = document.querySelector('.total');
    
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    };
};

// функция для обновления счетчика товаров в корзине
const updateCartCount = () => {
    const cart = getCart(); 
    const count = cart.length;
    
    const cartCountElement = document.querySelector('.items'); 

    if (cartCountElement) {
        const itemText = count === 1 ? 'item' : 'items';
        cartCountElement.textContent = `${count} ${itemText}`;
    };
};



