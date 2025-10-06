`Переменные, типы данных, условные операторы, циклы. Функции и области видимости:

1. Определи, является ли число чётным/нечётным.`

const isEven = (num) => {
    if (typeof num !== 'number' || isNaN(num)) {
        return false;
    };

    return num % 2 === 0;
};

//console.log(isEven(4));
//console.log(isEven(5));

`2. Найди наибольшее из трёх чисел.`

const getMax = (...values) => Math.max(...values);

//console.log(getMax(0, 100, 4));


`3. Напиши калькулятор: две переменные и операция (+, -, *, /), выведи результат.`

const operators = ['+', '-', '*', '/'];

const calculator = (a, b, operator) => {
    // проверка на числа
    if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
        throw new Error('некорректные переменные');
    };

    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) throw new Error('деление на ноль');
            return a / b;
        default:
            throw new Error('некорректный оператор');
    };
};

//console.log(calculator(5, 0, '/'));


`4. Напиши функцию, которая возвращает факториал числа.`

const getFactorial = (num) => {
        if (typeof num !== 'number' || isNaN(num) || !Number.isInteger(num) || num < 0) {
        return null;
    };

    if (num === 0 || num === 1) {
        return 1;
    };

    return num * getFactorial(num - 1);
};

//console.log(getFactorial(4));


`Массивы: 

1. Посчитай сумму значений массива.`

const sumArr = (arr) => {
    if (!Array.isArray(arr)) {
        return null;
    };
    
    if (!arr.every(num => typeof num === 'number' && !isNaN(num))) {
        return null;
    };

    return arr.reduce((sum, num) => {
        return sum + num; 
    }, 0);
};

//console.log(sumArr([1, 2, 6]));
//console.log(sumArr(`1, 2, 3`));


`2. Выведи только чётные числа из массива.`

const filterEvens = (arr) => {
    if (!Array.isArray(arr)) {
        return null; 
    };

    return arr.filter(num => typeof num === 'number' && !isNaN(num) && num % 2 === 0);
};

//console.log(filterEvens([1, 2, 4, 5, 6]));
//console.log(filterEvens([7, 3, 8]));


`3. Отсортируй массив по убыванию.`

const sortToMin = (arr) => {
    if (!Array.isArray(arr)) {
        return null;
    };

    if (!arr.every(num => typeof num === 'number' && !isNaN(num))) {
        return null;
    };


    return arr.slice().sort((a, b) => a - b);
};

//console.log(sortToMin([1, 2, 4, 5, 6]));
//console.log(sortToMin([7, 3, 8]));


`4. Даны два массива чисел. Напишите функцию, которая создаст новый массив, содержащий только те элементы, которые встречаются в обоих массивах.`

const arr1 = [1, 2, 3, 2, 1];
const arr2 = [3, 2, 1, 4, 5];

const getCommonElements = (arr1, arr2) => {
   
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        return null;
    };

    if (!arr1.every(num => typeof num === 'number' && !isNaN(num)) ||
        !arr2.every(num => typeof num === 'number' && !isNaN(num))) {
        return null;
    };

    const intersection = arr1.filter(item => arr2.includes(item));
    return [...new Set(intersection)].sort((a, b) => a - b);
};

//console.log(getCommonElements([1, 2, 3, 2, 1], [3, 2, 1, 4, 5]));


`
5. Напишите свою реализацию метода map.
`
const events = [
    {  
        name: "Event 1", 
        dateString: "2024-12-01" 
    },
    { 
        name: "Event 2", 
        dateString: "2024-12-15" 
    },
    { 
        name: "Event 3", 
        dateString: "2025-01-10" 
    },
];

const eventDates = events.map(event => new Date(event.dateString));

console.log(eventDates);

`
6 Напишите свою реализацию метода filter.
`
const users = [
    { 
        name: "Alice", 
        age: 25, 
        country: "USA" 
    },
    { 
        name: "Bob", 
        age: 17, 
        country: "USA" 
    },
    { 
        name: "Charlie", 
        age: 30, 
        country: "Canada" 
    },
    { 
        name: "David", 
        age: 22, 
        country: "USA" 
    }
];

const filteredUsers = users.filter(user => user.age > 18 && user.country === "USA");

console.log(filteredUsers);

`
7. Напишите свою реализацию метода reduce.
`

const cartItems = [
    { 
        product: "Book", 
        price: 12.99, 
        quantity: 2 
    },
    { 
        product: "Pen", 
        price: 1.49, 
        quantity: 5 
    },
    { 
        product: "Notebook", 
        price: 5.99, 
        quantity: 3 
    }
];

const totalCost = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
}, 0);

console.log(totalCost);


`Объекты:

1. Создай объект book с полями: title, author, year.
2. Выведи строку: "Название: <title>, Автор: <author>".
3. Измени поле year на другое значение.
4. Добавь поле genre, если его нет.
5. Создай массив из 3 объектов книг. Напиши функцию, которая выводит названия всех книг.
`

const book = {
    title: "1984",
    author: "Джордж Оруэлл",
    year: 2025,
};

console.log(`Название: ${book.title}, Aвтор: ${book.author}`);

book.year = 1949;

// console.log(book);

if (!book.genre) {
    book.genre = 'антиутопия';
};

// console.log(book);

const myBooks = [
    book,
  {
    title: "Наруто",
    author: "Масаши Кишимото",
    year: 1999,
    genre: "экшен",
  },
  {
    title: "Мир, полный демонов: Наука - как свеча во тьме",
    author: "Карл Саган",
    year: 1995,
    genre: "биография",
  }
];

// console.log(books)

const getNames = (books) => {
    books.forEach(book => {
        console.log(`Название: ${book.title}`)
    });
}

getNames(myBooks);