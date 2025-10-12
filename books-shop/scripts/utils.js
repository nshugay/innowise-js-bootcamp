export const getCart = () => {
    const cartData = localStorage.getItem('cart');

    if (!cartData || cartData === 'undefined') return [];

    try {
        const cart = JSON.parse(cartData);
        return Array.isArray(cart) ? cart : [];
    } catch (e) {
        console.error('Error parsing cart:', e);
        return [];
    };
};

export const setCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

export const filterBooksByQuery = (query, books) => {
    if (!query) return [];
    query = query.toLowerCase();

    return books.filter(book => {
        return book.title.toLowerCase().includes(query) ||
               book.author.toLowerCase().includes(query) ||
               book.description.toLowerCase().includes(query);
    });
};

export const highlightText = (text, query) => {
    if (!query) return text;
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return text.replace(regex, '<mark>\$1</mark>');
};

export const enableWheelScroll = (container, options) => {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    };

    if (!container) return;

    container.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            container.scrollLeft += e.deltaY * 0.5;
        };
    });

    if (options.autoScroll) {
        const interval = options.interval || 3000;
        const scrollDistance = options.scrollDistance || 272;
        let autoScrollInterval;
        let resumeTimeout;
        let isFirstStart = true;  
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (maxScroll <= 0) {
            console.warn('Контейнер не требует прокрутки (мало контента)');
            return;
        };

        const startAutoScroll = () => {

            if (isFirstStart) {
                container.scrollLeft = 0;
                isFirstStart = false;
            };
            
            autoScrollInterval = setInterval(() => {

                if (container.scrollLeft + scrollDistance >= maxScroll - 1) {
                    container.scrollLeft = 0;
                    return;
                };

                container.scrollLeft += scrollDistance;
                if (container.scrollLeft >= maxScroll - 1) {
                    container.scrollLeft = 0;
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
    }
};

