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

// функция для обновления итога покупки с учетом shopping
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


// генерация карточек
const generateCards = (book) => {  // book - объект с свойствами: id, title, author, price, stars, description, image, year
    const card = document.createElement('li');
    card.className = `card`;
    card.innerHTML = `
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
    </div>`;

    const addButton = document.createElement('button');
    addButton.classList.add('card__button', 'button');
    addButton.setAttribute('data-index', book.id);
    addButton.innerHTML = `
       <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.522522 1.3291C0.522522 0.874512 0.888291 0.508789 1.34294 0.508789H2.89831C3.65036 0.508789 4.31695 0.946289 4.62802 1.60254H18.6777C19.5767 1.60254 20.233 2.45703 19.9972 3.3252L18.5956 8.53076C18.3051 9.604 17.3308 10.3525 16.2198 10.3525H6.35774L6.54233 11.3267C6.61753 11.7129 6.95596 11.9932 7.34907 11.9932H17.2043C17.659 11.9932 18.0247 12.3589 18.0247 12.8135C18.0247 13.2681 17.659 13.6338 17.2043 13.6338H7.34907C6.16631 13.6338 5.15104 12.793 4.93226 11.6343L3.16837 2.37158C3.14444 2.2417 3.03163 2.14941 2.89831 2.14941H1.34294C0.888291 2.14941 0.522522 1.78369 0.522522 1.3291ZM4.89808 16.3682C4.89808 16.1527 4.94052 15.9394 5.02298 15.7403C5.10544 15.5413 5.2263 15.3604 5.37867 15.2081C5.53103 15.0557 5.71192 14.9349 5.91099 14.8524C6.11007 14.77 6.32343 14.7275 6.53891 14.7275C6.75439 14.7275 6.96776 14.77 7.16683 14.8524C7.36591 14.9349 7.54679 15.0557 7.69916 15.2081C7.85152 15.3604 7.97238 15.5413 8.05484 15.7403C8.1373 15.9394 8.17974 16.1527 8.17974 16.3682C8.17974 16.5836 8.1373 16.797 8.05484 16.996C7.97238 17.1951 7.85152 17.3759 7.69916 17.5283C7.54679 17.6806 7.36591 17.8015 7.16683 17.8839C6.96776 17.9664 6.75439 18.0088 6.53891 18.0088C6.32343 18.0088 6.11007 17.9664 5.91099 17.8839C5.71192 17.8015 5.53103 17.6806 5.37867 17.5283C5.2263 17.3759 5.10544 17.1951 5.02298 16.996C4.94052 16.797 4.89808 16.5836 4.89808 16.3682ZM16.3839 14.7275C16.8191 14.7275 17.2364 14.9004 17.5442 15.2081C17.8519 15.5157 18.0247 15.933 18.0247 16.3682C18.0247 16.8033 17.8519 17.2206 17.5442 17.5283C17.2364 17.8359 16.8191 18.0088 16.3839 18.0088C15.9487 18.0088 15.5314 17.8359 15.2237 17.5283C14.9159 17.2206 14.7431 16.8033 14.7431 16.3682C14.7431 15.933 14.9159 15.5157 15.2237 15.2081C15.5314 14.9004 15.9487 14.7275 16.3839 14.7275ZM9.1369 5.97754C9.1369 6.35352 9.44455 6.66113 9.82058 6.66113H11.3247V8.16504C11.3247 8.54102 11.6323 8.84863 12.0084 8.84863C12.3844 8.84863 12.692 8.54102 12.692 8.16504V6.66113H14.1961C14.5722 6.66113 14.8798 6.35352 14.8798 5.97754C14.8798 5.60156 14.5722 5.29395 14.1961 5.29395H12.692V3.79004C12.692 3.41406 12.3844 3.10645 12.0084 3.10645C11.6323 3.10645 11.3247 3.41406 11.3247 3.79004V5.29395H9.82058C9.44455 5.29395 9.1369 5.60156 9.1369 5.97754Z" fill="white"/>
        </svg>
        Add To Cart
        `;

    addButton.addEventListener('click', () => { 
        const bookId = addButton.getAttribute('data-index');
        const selectedBook = books.find(b => b.id == bookId);  // ищем книгу по id в массиве books
        if (!selectedBook) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // проверка на дубликаты
        if (!cart.some(b => b.id == bookId)) {
            cart.push(selectedBook);
            localStorage.setItem('cart', JSON.stringify(cart));
        };

        addButton.style.backgroundColor = 'var(--color-active-button)'; 
        addButton.innerHTML = `
        <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.522522 1.3291C0.522522 0.874512 0.888291 0.508789 1.34294 0.508789H2.89831C3.65036 0.508789 4.31695 0.946289 4.62802 1.60254H18.6777C19.5767 1.60254 20.233 2.45703 19.9972 3.3252L18.5956 8.53076C18.3051 9.604 17.3308 10.3525 16.2198 10.3525H6.35774L6.54233 11.3267C6.61753 11.7129 6.95596 11.9932 7.34907 11.9932H17.2043C17.659 11.9932 18.0247 12.3589 18.0247 12.8135C18.0247 13.2681 17.659 13.6338 17.2043 13.6338H7.34907C6.16631 13.6338 5.15104 12.793 4.93226 11.6343L3.16837 2.37158C3.14444 2.2417 3.03163 2.14941 2.89831 2.14941H1.34294C0.888291 2.14941 0.522522 1.78369 0.522522 1.3291ZM4.89808 16.3682C4.89808 16.1527 4.94052 15.9394 5.02298 15.7403C5.10544 15.5413 5.2263 15.3604 5.37867 15.2081C5.53103 15.0557 5.71192 14.9349 5.91099 14.8524C6.11007 14.77 6.32343 14.7275 6.53891 14.7275C6.75439 14.7275 6.96776 14.77 7.16683 14.8524C7.36591 14.9349 7.54679 15.0557 7.69916 15.2081C7.85152 15.3604 7.97238 15.5413 8.05484 15.7403C8.1373 15.9394 8.17974 16.1527 8.17974 16.3682C8.17974 16.5836 8.1373 16.797 8.05484 16.996C7.97238 17.1951 7.85152 17.3759 7.69916 17.5283C7.54679 17.6806 7.36591 17.8015 7.16683 17.8839C6.96776 17.9664 6.75439 18.0088 6.53891 18.0088C6.32343 18.0088 6.11007 17.9664 5.91099 17.8839C5.71192 17.8015 5.53103 17.6806 5.37867 17.5283C5.2263 17.3759 5.10544 17.1951 5.02298 16.996C4.94052 16.797 4.89808 16.5836 4.89808 16.3682ZM16.3839 14.7275C16.8191 14.7275 17.2364 14.9004 17.5442 15.2081C17.8519 15.5157 18.0247 15.933 18.0247 16.3682C18.0247 16.8033 17.8519 17.2206 17.5442 17.5283C17.2364 17.8359 16.8191 18.0088 16.3839 18.0088C15.9487 18.0088 15.5314 17.8359 15.2237 17.5283C14.9159 17.2206 14.7431 16.8033 14.7431 16.3682C14.7431 15.933 14.9159 15.5157 15.2237 15.2081C15.5314 14.9004 15.9487 14.7275 16.3839 14.7275ZM9.1369 5.97754C9.1369 6.35352 9.44455 6.66113 9.82058 6.66113H11.3247V8.16504C11.3247 8.54102 11.6323 8.84863 12.0084 8.84863C12.3844 8.84863 12.692 8.54102 12.692 8.16504V6.66113H14.1961C14.5722 6.66113 14.8798 6.35352 14.8798 5.97754C14.8798 5.60156 14.5722 5.29395 14.1961 5.29395H12.692V3.79004C12.692 3.41406 12.3844 3.10645 12.0084 3.10645C11.6323 3.10645 11.3247 3.41406 11.3247 3.79004V5.29395H9.82058C9.44455 5.29395 9.1369 5.60156 9.1369 5.97754Z" fill="white"/>
        </svg>                     
            Added To Cart
        `;
        addButton.disabled = true;
        updateCartIndicator();
    });

    card.appendChild(addButton);
    return card;
};

window.addEventListener('load', () => {
    updateCartIndicator();
});

const appendCards = (dataArray, container) => {
    container.innerHTML = '';
    
    dataArray.forEach((book) => {  
        const card = generateCards(book); 
        container.append(card);
    });
};



});