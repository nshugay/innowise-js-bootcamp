import { API_CONFIG } from './constants.js';

export const loadBooksFromAPI = async (cacheKey = 'books', MINUTES = 5) => {
    try {
        const baseUrl = API_CONFIG.BASE_URL;
        const booksEndpoint = `${baseUrl}${API_CONFIG.BOOKS_ENDPOINT}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);
            const currentTime = Date.now();
            const cacheExpirationTime = MINUTES * 60 * 1000;

            if (currentTime - timestamp < cacheExpirationTime) {
                return data;
            };
        };

        const response = await fetch(booksEndpoint);

        if (!response.ok) throw new Error('API is unavailable');

        const data = await response.json();

        const cacheEntry = {
            data,
            timestamp: Date.now()
        };

        localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));

        return data;
    } catch (error) {
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
            const { data } = JSON.parse(cachedData);
            return data;
        };

        return [];
    };
};