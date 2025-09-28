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
