'use strict';

///////
// JavaScript does NOT have Pase by reference
//
//
// Reference to a object by memory location (pointer to the actual object)
// memory location = reference
//
//
///////////////////////////

/////////////////
// Callback functions
//
// Executed later
//
//  Jonas thinks that this is the most importent Lectiore of the entire cource!!
//
// ref: 131. Functions Accepting Callback Functions
//
/* 
const oneWord = function (str) {
  return str.replace(/ /g, '');
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer('Javascript is the best!', upperFirstWord);

transformer('Javascript is the best!', oneWord);

// JS uses callbacks all the time!
const high5 = function () {
  console.log('Hi5');
};

document.addEventListener('click', high5);

['Kalle', 'Anna', 'Sara'].forEach(high5);


*/
//
// Functions returning functions
//

/* const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
}; 

// Challenge, rewrite as arrow Function
const greet = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greet('hey');
greeterHey('Jonas');
greeterHey('Anna');

greet('Hello')('Nisse');
*/

//
// The call and apply methods
//

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LM',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name: name });
  },
};
/* 
lufthansa.book(463, 'Johan Lind');

lufthansa.book(987, 'Conny Nilsson');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;
// Will not work
//book(456, 'Kalle Kula');

// The first argument is for the call method
// that sets the this keyword to the right object.
book.call(eurowings, 456, 'Kalle Kula');
book.call(lufthansa, 567, 'Tina Turner');

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 987, 'Lisa Månsson');
console.log(swiss);

// Apply method, takes an array as argument
const flightData = [567, 'Ronny Lund'];
book.apply(eurowings, flightData);
console.log(eurowings);

// Apply is Not used anymore
// The more modern way is using the spread operator
book.call(swiss, ...flightData);
//console.log(swiss);

// Bind method
// book.call(eurowings, 456, 'Kalle Kula');
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(345, 'Alexander Lucas');

// Pattern, partial application.
// A new function with some arguments already set.
const bookEW345 = book.bind(eurowings, 345);
bookEW345('Janne Långben');
bookEW345('Musse Pigg');
bookEW345('Kalle Anka');
*/
// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// You need the bind method to move the this keyword pointing
// lufthansa instead of the Eventlisteners dom element.
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

/*
// Partial Application
// Preset parameters
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// Kind of usual ta use null in the first argument.
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(300));

// the same thing using function returning a function
const arrAddTax = rate => amount => amount + amount * rate;
const arrAddVAT = arrAddTax(0.23);
console.log('tjo', arrAddVAT(300));
*/

// IIFE, Imedieatly Invoked Function Expressions
// Wrap a function with no name with parantheses
//  And call it directly by ();
// (function () {
//   console.log('This function will never be called again');
// })();

// Closures
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

// A Closure is the connection to the parent
// functions environment that the function was originated from.
// In this case the passengerCount Variable.
// THe parent function has left the call-stack
// See defenition of closure in the lecture material.

// From Mozilla
// "A closure is the combination of a function and
// the lexical environment within which that
// function was declared."
const booker = secureBooking();
booker();
booker();
booker();
// See the Closure in this output under Scopes
console.dir(booker);

// More Closures Examples
// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  //const perGroup = n / 3;
  console.log('/group: ', perGroup);

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers.`);
    console.log(`There are 3 groups. each with ${perGroup} passengers.`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 5);

// A closer look at Functions

// Challenge 1
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = prompt(
      `${this.question}\n ${this.options.join('\n')} \n(Write option number)`
    );

    console.log(poll);
    if (
      answer.length < 1 ||
      !Number.isInteger(Number(answer)) ||
      Number(answer) < 0 ||
      Number(answer) > 3
    ) {
      console.log(
        `${answer} is not a number or not between 0 and 3. Try again`
      );
    } else {
      this.answers[Number(answer)]++;
    }
    displayResults(this.answers);
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

const displayResults = function (type) {
  if (type instanceof Array) {
    console.log(`${type}`);
  } else {
    console.log(`Poll results are ${type}`);
  }
};

// Chalenge 2
/* 
This is more of a thinking challenge than a coding challenge 🤓
Your tasks:
1. Take the IIFE below and at the end of the function, attach an event listener that
changes the color of the selected h1 element ('header') to blue, each time
the body element is clicked. Do not select the h1 element again!
2. And now explain to yourself (or someone around you) why this worked! Take all
the time you need. Think about when exactly the callback function is executed,
and what that means for the variables involved in this example.
(function
 */
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });

  console.dir();
})();
