document.addEventListener('DOMContentLoaded', () => {


// массив с книгами
const books = [
    {
        title: "Cooking Made Easy",
        author: "Emily Clark",
        price: 9.99,
        stars: 4,
        description: "Simple and delicious recipes for everyday cooking.",
        image: './assets/img/book-item1.jpg',
        year: 2020,
    },
    {
        title: "Mystery of the Lost Island",
        author: "Jane Smith",
        price: 14.99,
        stars: 2,
        description: "A gripping mystery novel that keeps you guessing till the end.",
        image: './assets/img/book-item2.png',
        year: 2025,
    },
    {
        title: "Shadows of Doubt",
        author: "Emma Watson",
        price: 22.99,
        stars: 3,
        description: "A detective novel filled with twists and unexpected turns.",
        image: './assets/img/book-item3.jpg',
        year: 2025,
    },
            {
        title: "The Silent Forest",
        author: "David Kim",
        price: 29.99,
        stars: 5,
        description: "A chilling suspense story set in a haunted woodland.",
        image: './assets/img/book-item4.jpg',
        year: 2020,
    },
        {
        title: "Cooking Made Easy",
        author: "Emily Clark",
        price: 9.99,
        stars: 4,
        description: "Simple and delicious recipes for everyday cooking.",
        image: './assets/img/book-item1.jpg',
        year: 2025,
    },
    {
        title: "Mystery of the Lost Island",
        author: "Jane Smith",
        price: 14.99,
        stars: 5,
        description: "A gripping mystery novel that keeps you guessing till the end.",
        image: './assets/img/book-item2.png',
        year: 2023,
    },
    {
        title: "Shadows of Doubt",
        author: "Emma Watson",
        price: 22.99,
        stars: 3,
        description: "A detective novel filled with twists and unexpected turns.",
        image: './assets/img/book-item3.jpg',
        year: 2020,
    },
            {
        title: "The Silent Forest",
        author: "David Kim",
        price: 29.99,
        stars: 2,
        description: "A chilling suspense story set in a haunted woodland.",
        image: './assets/img/book-item4.jpg',
        year: 2025,
    },
        {
        title: "Cooking Made Easy",
        author: "Emily Clark",
        price: 9.99,
        stars: 5,
        description: "Simple and delicious recipes for everyday cooking.",
        image: './assets/img/book-item1.jpg',
        year: 2025,
    },
    {
        title: "Mystery of the Lost Island",
        author: "Jane Smith",
        price: 14.99,
        stars: 5,
        description: "A gripping mystery novel that keeps you guessing till the end.",
        image: './assets/img/book-item2.png',
        year: 2020,
    },
    {
        title: "Shadows of Doubt",
        author: "Emma Watson",
        price: 22.99,
        stars: 5,
        description: "A detective novel filled with twists and unexpected turns.",
        image: './assets/img/book-item3.jpg',
        year: 2020,
    },
            {
        title: "The Silent Forest",
        author: "David Kim",
        price: 29.99,
        stars: 3,
        description: "A chilling suspense story set in a haunted woodland.",
        image: './assets/img/book-item4.jpg',
        year: 2025,
    },
    
];

// массив корзины
let cart = [];


// id каждой книге (с api можно будет генерировать уникальные)
books.forEach((book, index) => {
    book.id = index; 
});

// функция для присвоения звезд по рейтингу
const renderStars = (stars) => {
  const maxRating = 5;
  let starsHTML = '';

  for (let i = 1; i <= maxRating; i++) {
    if (i <= stars) {
      starsHTML += `<svg class="star star_filled" width="15" height="15" viewBox="0 0 15 15" fill="" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.2178 1.08093C8.07288 0.780151 7.76663 0.588745 7.4303 0.588745C7.09397 0.588745 6.79045 0.780151 6.6428 1.08093L4.88459 4.69851L0.958032 5.2782C0.629907 5.32742 0.356469 5.5571 0.255297 5.87156C0.154125 6.18601 0.236156 6.53328 0.471313 6.7657L3.32053 9.58484L2.64788 13.5688C2.59319 13.8969 2.72991 14.2305 3.00061 14.4247C3.27131 14.6188 3.62952 14.6434 3.92483 14.4876L7.43303 12.6145L10.9412 14.4876C11.2365 14.6434 11.5947 14.6216 11.8655 14.4247C12.1362 14.2278 12.2729 13.8969 12.2182 13.5688L11.5428 9.58484L14.392 6.7657C14.6272 6.53328 14.7119 6.18601 14.608 5.87156C14.5041 5.5571 14.2334 5.32742 13.9053 5.2782L9.976 4.69851L8.2178 1.08093Z" fill="#84CC16"/>
                   </svg>`;
    } else {
      starsHTML += `<svg class="star star_unfilled" width="15" height="15" viewBox="0 0 15 15" fill="" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.2178 1.08093C8.07288 0.780151 7.76663 0.588745 7.4303 0.588745C7.09397 0.588745 6.79045 0.780151 6.6428 1.08093L4.88459 4.69851L0.958032 5.2782C0.629907 5.32742 0.356469 5.5571 0.255297 5.87156C0.154125 6.18601 0.236156 6.53328 0.471313 6.7657L3.32053 9.58484L2.64788 13.5688C2.59319 13.8969 2.72991 14.2305 3.00061 14.4247C3.27131 14.6188 3.62952 14.6434 3.92483 14.4876L7.43303 12.6145L10.9412 14.4876C11.2365 14.6434 11.5947 14.6216 11.8655 14.4247C12.1362 14.2278 12.2729 13.8969 12.2182 13.5688L11.5428 9.58484L14.392 6.7657C14.6272 6.53328 14.7119 6.18601 14.608 5.87156C14.5041 5.5571 14.2334 5.32742 13.9053 5.2782L9.976 4.69851L8.2178 1.08093Z" fill="#84CC16"/>
                    </svg>`;
    };
  };

  return starsHTML;
};
/*
undateCounters = () => {
    updateCartIndicator();
    updateTotalSum();
    updateCartCount();
};
*/

// обновление индикатора в хедере
updateCartIndicator = () => {
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

// функция для обновления итога покупки с четом shopping
updateTotalSum = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const subTotalSum = cart.reduce((sum, book) => sum + book.price, 0); 
    const subTotalElement = document.querySelector('.subtotal'); 
    
    if (subTotalElement) {
        subTotalElement.textContent = `$${subTotalSum.toFixed(2)}`; 
    };

    const shoppingElement = document.querySelector('.shopping');
    const totalElement = document.querySelector('.total');
    const shoppingCost = shoppingElement ? parseFloat(shoppingElement.textContent) || 0 : 0;
    const total = subTotalSum + shoppingCost;

    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    };
};

// функция для обновления счетчика товаров в корзине
updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.length;
    
    const cartCountElement = document.querySelector('.items'); 

    if (cartCountElement) {
        const itemText = count === 1 ? 'item' : (count >= 2 && count <= 4 ? 'items' : 'items');
        cartCountElement.textContent = `${count} ${itemText}`;
    };
};





});