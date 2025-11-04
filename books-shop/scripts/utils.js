import { stateManager } from '../scripts/state.js';

export const getCart = () => stateManager.getState('cart');

export const setCart = (cart) => stateManager.setState({ cart });

export const debounce = (func, delay) => {
    if (typeof func !== 'function' || typeof delay !== 'number' || delay < 0) {
        return () => {};
    };

    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

export const filterBooksByQuery = (query, books) => {
    if (!query || typeof query !== 'string') return [];

    if (!Array.isArray(books)) return [];

    query = query.toLowerCase();

    return books.filter(book => {
        if (!book || typeof book !== 'object') return false;

        return (book.title && book.title.toLowerCase().includes(query)) ||
               (book.author && book.author.toLowerCase().includes(query)) ||
               (book.description && book.description.toLowerCase().includes(query));
    });
};

export const highlightText = (text, query) => {
    if (!text || typeof text !== 'string') return '';
    if (!query || typeof query !== 'string') return text;
    try {
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedQuery})`, 'gi');
        return text.replace(regex, '<mark>\$1</mark>');
    } catch (e) {
        console.error('err', e);
        return text;
    }
};

export const enableWheelScroll = (container, options = {}) => {
    if (typeof container === 'string') {
        try {
            container = document.querySelector(container);
        } catch (e) {
            console.error('err', e);
            return;
        }
    };

    if (!container || !(container instanceof Element)) {
        return;
    };

    try {
        container.addEventListener('wheel', (e) => {
            if (!e || typeof e.deltaY !== 'number' || typeof e.deltaX !== 'number') return;
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                container.scrollLeft += e.deltaY * 0.5;
            }
        });
    } catch (e) {
        console.error('err', e);
        return;
    };

    if (options && options.autoScroll) {
        const interval = options.interval || 3000;
        const scrollDistance = options.scrollDistance || 272;
        let autoScrollInterval;
        let resumeTimeout;
        let isFirstStart = true;

        try {
            const maxScroll = container.scrollWidth - container.clientWidth;
            if (maxScroll <= 0) return;

            const startAutoScroll = () => {
                if (isFirstStart) {
                    container.scrollLeft = 0;
                    isFirstStart = false;
                };
                
                autoScrollInterval = setInterval(() => {
                    try {
                        if (container.scrollLeft + scrollDistance >= maxScroll - 1) {
                            container.scrollLeft = 0;
                            return;
                        };

                        container.scrollLeft += scrollDistance;
                        if (container.scrollLeft >= maxScroll - 1) {
                            container.scrollLeft = 0;
                        };

                    } catch (e) {
                        console.error('err', e);
                        stopAutoScroll();
                    };

                }, interval);
            };

            const stopAutoScroll = () => {
                if (autoScrollInterval) {
                    clearInterval(autoScrollInterval);
                    autoScrollInterval = null;
                };
            };

            const resumeAutoScroll = () => {
                clearTimeout(resumeTimeout);
                resumeTimeout = setTimeout(() => {
                    startAutoScroll();  
                }, 3000);
            };

            startAutoScroll();

            container.addEventListener('mouseenter', () => {
                stopAutoScroll();
            });

            container.addEventListener('mouseleave', () => {
                resumeAutoScroll();
            });

            container.addEventListener('scroll', () => {
                stopAutoScroll();
                resumeAutoScroll();
            });
        } catch (e) {
            console.error('Error setting up autoScroll:', e);
        };
    };
};

export const updateCartItemQuantity = (book, quantityInput, priceValue, basePrice, newQuantity) => {
    const validQuantity = Math.max(1, Math.min(99, newQuantity));
    quantityInput.value = validQuantity;

    if (priceValue) {
        priceValue.textContent = (basePrice * validQuantity).toFixed(2);
    };

    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === book.id);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = validQuantity;
        setCart(cart);
    };
};

