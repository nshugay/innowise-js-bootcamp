`Переменные, типы данных, условные операторы, циклы. Функции и области видимости:

1. Определи, является ли число чётным/нечётным.`

const checkEven = (num) => {
    return num % 2 === 0;   
};

let num = 1;
console.log(checkEven(num));

num = 14;
console.log(checkEven(num));


`2. Найди наибольшее из трёх чисел.`

const checkMax = (a, b, c) => {
    return(Math.max(a, b, c));
};

const maxNumber = checkMax(0, 100, 4);
console.log(maxNumber);


`3. Напиши калькулятор: две переменные и операция (+, -, *, /), выведи результат.`

const operators = ['+', '-', '*', '/'];

const calculator = (a, b, operator) => {
    if (
        !operators.includes(operator) || typeof a !== 'number' || typeof b !== 'number'
    ) {
        return undefined;
    };

    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b !== 0 ? a / b : 'error';
        default:
            return undefined;
    }
};

let a = 2;
let b = 3;
let operator = '+';
console.log(calculator(a, b, operator));

a = 5;
b = 0;
operator = '/';
console.log(calculator(a, b, operator));


`4. Напиши функцию, которая возвращает факториал числа.`

const factorial = (num) => {
  if (num < 0) 
    return undefined;

  if (num === 0 || num === 1) 
    return 1;

  return num * factorial(num - 1);
}

console.log(factorial(4));


`Массивы: 

1. Посчитай сумму значений массива.`

const sumArr = (arr) => {
    if(!Array.isArray(arr)) 
        return undefined;

    return(arr.reduce((sum, num) => {
        return sum += num
    }, 0))
};

console.log(sumArr([1, 2, 6]));
console.log(sumArr(`1, 2, 3`));


`2. Выведи только чётные числа из массива.`

const filterEvens = (arr) => {
  return(arr.filter(num => num % 2 === 0).join(', ')); //по условию возвращаем не массивом
};

console.log(filterEvens([1, 2, 4, 5, 6]));
console.log(filterEvens([7, 3, 8]));


`3. Отсортируй массив по убыванию.`

const sortToMin = (arr) => {
  return(arr.slice().sort((a, b) => b - a).join(', ')); 
};

console.log(sortToMin([1, 2, 4, 5, 6]));
console.log(sortToMin([7, 3, 8]));


`4. Даны два массива чисел. Напишите функцию, которая создаст новый массив, содержащий только те элементы, которые встречаются в обоих массивах.`

const arr1 = [1, 2, 3, 2, 1];
const arr2 = [3, 2, 1, 4, 5];

const combineArrays = (arr1, arr2) => {
    let arr3 = arr1.filter(item => arr2.includes(item));//в т.ч. уникальные и повторяющиеся

    return arr3.sort();
}

console.log(combineArrays(arr1, arr2));


`
5. Напишите свою реализацию метода map.
6 Напишите свою реализацию метода filter.
7. Напишите свою реализацию метода reduce.
`
//решила сделать три в одном, т.к. filter и reduce аналогично до этого реализовывала в задачах

const implementThreeMethods = (arr2) => {
    const arr5 = arr2.map(num => num * 2); // 6, 4, 2, 8, 10

    const arr6 = arr5.filter(num => num > 6) // 8, 10

    const arr7 = arr6.reduce((sub, num) => sub -= num, 0) // -8 -10 = -18

    return arr7;
};

console.log(implementThreeMethods(arr2));