'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // ES6 Enhancement, just write the name of the object you want to include.
  openingHours,

  // ES6 Enhancement, you do not have to have function keyword for methods anymore
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your fantastic pasta with the ingredients: ${ing1}, ${ing2}, ${ing3}`
    );
  },
};
/////////////////////////////////////
//
// String methods
//
////////////////////////////////////

const capitalizeNames = function (name) {
  const names = name.split(' ');
  const namesUpperCase = [];

  for (const n of names) {
    // console.log(name);
    namesUpperCase.push(n[0].toUpperCase() + n.slice(1));
  }
  console.log(namesUpperCase.join(' '));
};

capitalizeNames('amanda linea calissendorff lind');

// const airLine = 'TAP Air Portugal';
// const plane = 'A320';

// console.log(airLine.indexOf('r'));
// console.log(airLine.lastIndexOf('r'));

// console.log(airLine.slice(airLine.lastIndexOf('P'), airLine.length));
// console.log(airLine.substring(airLine.lastIndexOf('P'), airLine.length));
// console.log(airLine.slice(0, airLine.indexOf(' '))); // Should write TAP
// console.log(airLine.slice(-2)); // Starts counting from the end.

// const checkLuggage = function (items) {
//   const cleaned = items.trim().toLowerCase();
//   if (cleaned.includes('gun') || cleaned.includes('knife')) {
//     console.log('Do not bring dangerous items on your travels.');
//   }
// };

// checkLuggage('I have a laptop a camera and a knife');

// checkLuggage('I carry Keys, Book and a Sandwich.');

// checkLuggage('I have some clothes and a small Handgun for my own protection');

// // Split & Join
// console.log('sommar;blomma;sol;bad;fiske'.split(';'));

// const [firstname, lastname] = 'Johan Lind'.split(' ');
// console.log(firstname);
// console.log(lastname);

// // Join
// const label = ['Mr', firstname, lastname].join(' ');
// console.log(label);

// // Padding
// const creditCardNumber = '392141924719284791';
// console.log(creditCardNumber);
// const maskedCreditCardNumber = creditCardNumber
//   .slice(-4)
//   .padStart(creditCardNumber.length, '*');
// console.log(maskedCreditCardNumber);

// ES6 Set (1 av varje)
// Set är bara till för att hålla unik datasets
// Man kan inte hämta ut element från ett set
// Då skall man använda array istället.
//const gears = new Set(['neutral', 'drive', 'reverse', 'park', 'neutral']);
//console.log(gears);
//gears.add('speed1');
//console.log(gears);

// for (const gear of gears) {
//   console.log(gear);
// }

// Kopiera till array
// const gearsArray = [...gears];
// for (const gear of gearsArray.entries()) {
//   console.log(gear);
// }

// Maps
// const fishes = new Map();
// fishes.set(1, 'rainbow');
// fishes.set(2, 'trout');
// fishes.set(3, 'grayling');

// for (const fish of fishes) console.log(fish);
// console.log(fishes);
// console.log(fishes.has(1));

// // When setting a value, the Map is return which allow method-chaining
// const motorbike = new Map();
// motorbike.set('brand', 'KTM').set('model', 'exc').set(true, 'This is a enduro');
// console.log(motorbike);
// console.log(motorbike.get(true));

// Convert object to Map
// const hoursMap = Object.entries(restaurant.openingHours);
// console.log(hoursMap);

// const questions = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'c'],
//   [2, 'Java'],
//   [3, 'javascript'],
//   ['correct', 3],
//   [true, 'correct!'],
//   [false, 'try again :-)'],
// ]);

// console.log(questions.get('question'));
// for (const [key, value] of questions) {
//   if (typeof key === 'number') {
//     console.log(`Answer ${key}: ${value}`);
//   }
// }

// const answer = Number(prompt('answer: '));
// console.log(answer);
// console.log(questions.get(answer === questions.get('correct')));

//const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
//for (const day of days ) {
//  console.log(`The restaurant opens ${day} at: ${openingHours[day]?.open ?? 'closed'}`);
//}

// METHOD  Optional chaining
//console.log(restaurant.orderPasta?.('oil', 'garlic', 'tomatoes') ?? 'non existing method.');
//console.log(restaurant.order?.('oil', 'garlic', 'tomatoes') ?? 'non existing method.');
/* 
// Arrays
const users = [
  { name: 'Lars', age: 25, gender: 'male' },
  { name: 'Anna', age: 34, gender: 'female' },
  { name: 'Anna', age: 34, gender: 'female', hobby: 'golf' },
];

for (const user of users) {
  let userName = user.name;
  let hobbyName = user?.hobby ?? 'no hobby';

  console.log(`${userName} is interested in ${hobbyName}`);
}
 */
//console.log(restaurant.openingHours?.mon?.open);
//console.log(restaurant.openingHours?.fri?.open);

//const menu = restaurant.mainMenu;

//for (const item of menu) console.log(item);

//for (const [index, name] of menu.entries()) {
//console.log(`${index + 1}: ${name}`);
//}

/* 
// Destructure objects, eg put in brackets. 
// Thoose object keys that you are interested in. Good when fetching data from API:s.
const {name, openingHours, categories} = restaurant;

console.log(name, openingHours, categories);


// Give the object structure key names new variable names for your domain(use colon).
const {name: nameOfRestarant, openingHours: hours} = restaurant

console.log(nameOfRestarant, hours);

// Use default values to variables in de-structure
const {name: rest, main = "empty"} = restaurant;

console.log(rest, main);

// Mutating variables
/* 
let a = 1123;
let b = 999;

const obj = {a: 7, b: 9, c: 14};
({a, b} = obj);

console.log(`a is: ${a} and b is: ${b}`);

// Nested objects
const { fri: {open, close} } = openingHours;
console.log(open, close);


const array = [4, 7, 9];
const badArrayCopy = [1, 2, array[0], array[1], array[2]];
console.log(badArrayCopy); 
// Spread operator, new from e6
const arrCopy = [1, 2, ...array];
console.log(arrCopy);

// Join 2 or more arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Iterables: arrays, strings, maps, set. But not objects.
const myName = 'Johan'
console.log(...myName);

// Note:
// Multiple values is only applicipal when building 
// a new array or sending in values to a function.


//const ingredients = [prompt('Let\'s make pasta! Ingredient 1?'), prompt('Ingredient 2?'), prompt('Ingredient 3?')]
//restaurant.orderPasta(...ingredients);


// Objects
const newRestaurant = {foundedIn: 1998, ...restaurant, founder: "Harry"};
console.log(newRestaurant);

const restaurantCopy = {...restaurant};
restaurantCopy.name = "Chrilles Pizzeria";
console.log(restaurantCopy.name);
console.log(restaurant.name);

,// Spread: right side of =
const arr = [1,2, ...[3,4]];



// Rest: left side of =
const [a, b, ...theRest] = [1, 2, 3, 5, 6];
console.log(a, b, theRest);
 */

/* 
let values = Object.values(restaurant.openingHours);
console.log(values);
 */
/* 
let entries = Object.entries(restaurant.openingHours);
console.log(entries);
 */

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: [
    'Lewandowski',
    'Gnarby',
    'Gnarby',
    'Gnarby',
    'Lewandowski',
    'Hummels',
  ],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

// const names = name.split(' ');
// const namesUpperCase = [];

// for (const n of names) {
//   // console.log(name);
//   namesUpperCase.push(n[0].toUpperCase() + n.slice(1));
// }
//console.log(namesUpperCase.join(' '));

// Challange 4
// Convert text to CamelCase

const convertToCamelCase = function (text) {
  let t = text.trim().toLowerCase();
  const words = t.split('_');
  const upperCaseWords = [];

  for (const w of words) {
    upperCaseWords.push(w[0].toUpperCase() + w.slice(1));
  }

  console.log(upperCaseWords.join(''));
};

convertToCamelCase('underscore_case');
convertToCamelCase('first_name');
convertToCamelCase('Some_Variable');
convertToCamelCase('calculate_AGE');
convertToCamelCase('delayed_departure');

// Challenge 3
// 1.Create an array 'events' of the different game events that happened (no duplicates)
//const events = [...new Set(gameEvents.values())];
// console.log(events);

// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
//gameEvents.delete(64);
//console.log(gameEvents);

//3. Compute and log the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );

// Loop over 'gameEvents' and log each element to the console,
// marking whether it's in the first half or second half
// (after 45 min) of the game, exapmle: [FIRST HALF] 17: Goal
// for (const [minute, event] of gameEvents.entries()) {
//   console.log(
//     `[${minute < 46 ? 'FIRST HALF' : 'SECOND HALF'}] ${minute}: ${event}`
//   );
//}
// console.log(`An event happened, on average, every ${average} minutes`);

// Challenge 2
// 1. Loop game.scored array
// for (const [index, player] of game.scored.entries()) {
//console.log(`Goal ${index + 1} made by ${player}`);
// }

// 2. Use a loop to calculate the average odds and log it to the console
// let sum = 0;
// const odds = Object.values(game.odds);
// for (const value of odds) {
//   sum += value;
// }

//console.log('average odds: ', sum / odds.length);

// 3. Print the 3 odds to the console
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// for (const [key, value] of Object.entries(game.odds)) {
//   const team = key === 'x' ? 'draw' : 'victory by ' + game[key];
//   //console.log(`Odds for ${team}: ${value}`);
// }
// 4. Bonus: Create an object called 'scorers' which contains the names of the
// players who scored as properties, and the number of goals as the value.
// {
//   Gnarby: 1,
//   Hummels: 1,
//   Lewandowski: 2
// }

// const scorers = {};
// for (const players of game.scored) {
//   console.log(players);
//   scorers[players] ? scorers[players]++ : (scorers[players] = 1);
// }
// console.log(scorers);

/* // Challenge 1
// 1.
//const players1 = game.players[0];
//const players2 = game.players[1];
const [players1, players2] = game.players;

//console.log(players1);
//console.log(players2)

// 2.
const [gk, ...fieldPlayers] = players1;
//console.log(gk);
//console.log(fieldPlayers);

// 3.
const allPlayers = [...players1, ...players2];
//console.log(allPlayers);

// 4.
const players1Final = ['Thiago', 'Coutinho', 'Perisic', ...players1];
// console.log(players1Final);

// 5.
const { team1, x: draw, team2 } = { ...game.odds };
//console.log(team1, draw, team2);

// .6
function printGoals(...players) {
  let numberOfGoals = 0;

  for (let i = 0; i < players.length; i++) {
    numberOfGoals++;
  }
  //console.log(players, numberOfGoals);
}

printGoals('Johan');
printGoals('Kalle', 'Anna');
printGoals('Conny', 'Anna', 'Lisa');
printGoals(...game.scored);

// 7.
// Which team has the lowest odds?

//team1 < team2 && console.log('Team 1 has have better odds to win!');
 */
