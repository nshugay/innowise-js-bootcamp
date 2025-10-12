// Инициализируем cart с данными из localStorage (кэшируем)
export let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция для чтения cart (теперь она просто возвращает кэшированный cart)
export const getCart = () => cart;

// Функция для синхронизации cart с localStorage
export const setCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};
// Функция для сохранения cart в localStorage (обновляет и localStorage, и кэш)
export const saveCart = (newCart) => {
    cart = newCart;
    localStorage.setItem('cart', JSON.stringify(cart));
};