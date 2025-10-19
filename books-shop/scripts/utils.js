export const getCart = () => {
    try {
        const cartData = localStorage.getItem('cart');
        if (!cartData || cartData === 'undefined') return [];

        const cart = JSON.parse(cartData);
        return Array.isArray(cart) ? cart : [];
    } catch (e) {
        console.error('Error parsing cart from localStorage:', e);
        return [];
    };
};

export const setCart = (cart) => {
    if (!Array.isArray(cart)) {
        console.warn('setCart: cart must be an array, received:', cart);
        return null;
    };

    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        console.error('Error saving cart to localStorage:', e);
    };
};

export const debounce = (func, delay) => {
    if (typeof func !== 'function' || typeof delay !== 'number' || delay < 0) {
        console.warn('debounce: invalid arguments - func must be a function, delay must be a positive number');
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
        console.error('Error in highlightText regex:', e);
        return text;
    }
};

export const enableWheelScroll = (container, options = {}) => {
    if (typeof container === 'string') {
        try {
            container = document.querySelector(container);
        } catch (e) {
            console.error('Error querying container:', e);
            return;
        }
    };

    if (!container || !(container instanceof Element)) {
        console.warn('enableWheelScroll: invalid container');
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
        console.error('Error adding wheel event listener:', e);
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
                        console.error('Error in autoScroll interval:', e);
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


