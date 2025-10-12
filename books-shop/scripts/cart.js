export { updateCartIndicator}

// функция для обновления итога покупки с учетом shopping
const updateTotalSum = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Рассчёт промежуточной суммы (subtotal)
    const subTotalSum = cart.reduce((sum, book) => sum + (book.price || 0), 0);
    const subTotalElement = document.querySelector('.subtotal'); 
    
    if (subTotalElement) {
        subTotalElement.textContent = `$${subTotalSum.toFixed(2)}`;
    }

    // Получение стоимости доставки: по умолчанию 9.99
    const shippingElement = document.querySelector('.shipping');
    let shippingCost = 9.99;  // Изначальное значение

    // Получение порога для бесплатной доставки
    const freeShipElement = document.querySelector('#free-shipping-value');
    let freeShipValue = 0;  // Если не найден, всегда платная доставка
    if (freeShipElement) {
        freeShipValue = parseFloat(freeShipElement.textContent.replace(/[^\d.-]/g, '')) || 0;
    }

    // Логика переключения доставки
    if (subTotalSum > freeShipValue) {
        shippingCost = 0;  // Бесплатная доставка
    } else {
        shippingCost = 9.99;  // Платная доставка
    }

    // Обновление текста элемента доставки для синхронизации UI
    if (shippingElement) {
        shippingElement.textContent = `$${shippingCost.toFixed(2)}`;
    }

    // Рассчёт итоговой суммы
    const total = subTotalSum + shippingCost;
    const totalElement = document.querySelector('.total');
    
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
};



// функция для обновления счетчика товаров в корзине
const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.length;
    
    const cartCountElement = document.querySelector('.items'); 

    if (cartCountElement) {
        const itemText = count === 1 ? 'item' : 'items';
        cartCountElement.textContent = `${count} ${itemText}`;
    };
};

// обновление индикатора в хедере
const updateCartIndicator = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.length;

    const indicator = document.querySelector('.circle__num');
    //const circle = document.querySelector('.circle');
  
    if (indicator) {
        indicator.innerHTML = '';
        indicator.textContent = totalQuantity;
    };

    updateTotalSum();
    updateCartCount();
};

