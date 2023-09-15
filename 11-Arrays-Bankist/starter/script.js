'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = (movements, sort = false) => {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (move, i) {
    const type = move > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}"> ${
      i + 1
    } ${type}</div>
      <div class="movements__value">${move}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcPrintBalance = account => {
  account.balance = account.movements.reduce(
    (accumelated, current) => accumelated + current,
    0
  );
  labelBalance.textContent = `${account.balance}€`;
};

const calcDisplaySummary = account => {
  const deposits = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${deposits}€`;

  const redrawals = account.movements
    .filter(move => move < 0)
    .reduce((acc, move) => acc + move, 0);
  labelSumOut.textContent = `${Math.abs(redrawals)}€`;

  const interest = account.movements
    .filter(move => move > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .reduce((acc, deposit) => acc + deposit);
  labelSumInterest.textContent = `${interest}€`;
};

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name.at(0))
      .join('');
  });
};
createUserNames(accounts);
const updateUI = account => {
  // Display movements
  displayMovements(account.movements);
  // Display balance
  calcPrintBalance(account);
  // Display summary
  calcDisplaySummary(account);
};
/////////////////
//
// EventHandlers
//
let currentAccount;
const login = btnLogin.addEventListener('click', e => {
  // Prevent form from submitting (reloads page, log writes are removed)
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Wellcome back, ${currentAccount.owner
      .split(' ')
      .at(0)}`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    // Remove focus
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

const transaction = btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const to = inputTransferTo.value;

  inputTransferAmount.value = inputTransferTo.value = '';
  btnTransfer.blur();

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    to !== currentAccount.username
  ) {
    const account = accounts.find(a => a.username === to);
    if (account) {
      account.movements.push(amount);
      currentAccount.movements.push(amount * -1);
      updateUI(currentAccount);
      console.log('The money ha been Transfered.');
    } else {
      console.log(
        `User ${to} does not have a account. The transfer will not take place.`
      );
    }
  } else {
    console.log(
      `You do not have enough money to transfer. Your current balance ${currentAccount.balance}`
    );
  }
});
const closeAccount = btnClose.addEventListener('click', e => {
  e.preventDefault();
  const usr = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);

  console.log(usr, pin);

  if (usr === currentAccount.username && pin === currentAccount.pin) {
    const index = accounts.findIndex(
      acc =>
        acc.username === currentAccount.username &&
        acc.pin === currentAccount.pin
    );
    // Delete Account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
    // Reset fields
    inputCloseUsername.value = inputClosePin.value = '';
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some(move => move >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
  }
  updateUI(currentAccount);
  inputLoanAmount.value = '';
});

let sorted = false; // state variable
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////
/* 
const arr = ['a', 'b', 'c', 'd', 'e'];
// Slice
// Does not change the original
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
// Shallow copy (en kopia)
console.log(arr.slice());

// Splice
// Do change (Mutate) the original array
// Returns wats removed
//console.log(arr.splice(2, 4));
//console.log(arr.splice(-1)); // Removes the last element
//console.log(arr);

// Reverse, mutates the array
console.log(arr.reverse());

const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// getting the last element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

// foreach
movements.forEach(movement => {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew  ${Math.abs(movement)}`);
  }
});

// Foreach using index
movements.forEach((move, i) => {
  if (move > 0) {
    console.log(`Movement #${i} You deposited ${move}`);
  } else {
    console.log(`Movement #${i} You withdrew  ${Math.abs(move)}`);
  }
});
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements);
// includes: equality
console.log(movements.includes(-130));
console.log(movements.includes(95));

// some: condition
const anyDeposits = movements.some(move => move > 0);
console.log(anyDeposits);

// every: condition
console.log(movements.every(move => move > 0));
console.log(account4.movements.every(move => move > 0));

// Separate callback
const deposit = move => move > 0;
console.log(movements.every(deposit));
console.log(movements.some(deposit));

// Flat method 2019
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat());
console.log(arrDeep.flat(2));

// Common operation
// Flat
const overallBalance = accounts
.map(a => a.movements)
.flat()
.reduce((acc, move) => acc + move);
console.log(overallBalance);

// FlatMap.  Only goes one level, if deeper nesting use flat instead
const overallBalance2 = accounts
.flatMap(a => a.movements)
.reduce((acc, move) => acc + move);
console.log(overallBalance2);

//
// Sorting arrays
//
//
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// Strings
// Natural sorting in strings eg. alphabetic
// mutates the original array
const owners = ['Kalle', 'Alexander', 'Kajsa', 'Musse', 'Joakim'];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);
console.log(movements.sort());
// result: [-130, -400, -650, 1300, 200, 3000, 450, 70]
// wrong for number sorting, we can the use a comparator

// return < 0 A, B (keep order)
// return > 0, B, A (switch order)

// Ascending
// movements.sort((a, b) => {
  //   if (a > b) return 1;
  //   if (b > a) return -1;
  // });
  // console.log(movements);
  // [-650, -400, -130, 70, 200, 450, 1300, 3000]
  // Shorter :-)
  movements.sort((a, b) => a - b);
  console.log(movements);
  // Descending
  // movements.sort((a, b) => {
    //   if (a > b) return -1;
    //   if (b > a) return 1;
    // });
    console.log(movements);
    // [3000, 1300, 450, 200, 70, -130, -400, -650]
    movements.sort((a, b) => b - a);
    console.log(movements);
    
    // Creating arrays
    const arr = [1, 2, 3, 4, 5, 6, 7];
    console.log(new Array(1, 2, 3, 4, 5, 6, 7));
    // [1, 2, 3, 4, 5, 6, 7]
    
    // Empty arrays + fill method
    const x = new Array(7);
    console.log(x);
    // [empty × 7]
    
    //console.log(x.map(() => 5));
    // [empty × 7]
    
    //x.fill(1, 3, 5);
    // console.log(x);
    // [empty × 3, 1, 1, empty × 2]
    
    x.fill(1);
    // [1, 1, 1, 1, 1, 1, 1]
    console.log(x);
    
    arr.fill(23, 2, 6);
    console.log(arr);
    // [1, 2, 23, 23, 23, 23, 7]
    
    const y = Array.from({ length: 7 }, () => 1);
    console.log(y);
    // [1, 1, 1, 1, 1, 1, 1]
    
    // underscore _ is used when you do not care about an argument
    // This are a convension that programmers in javascript follows
    const z = Array.from({ length: 7 }, (_, i) => i + 1);
    console.log(z);
    // [1, 2, 3, 4, 5, 6, 7]
    
    labelBalance.addEventListener('click', () => {
      const movementsUI = Array.from(
        document.querySelectorAll('.movements__value'),
        el => Number(el.textContent.replace('€', ''))
        );
        
        console.log(movementsUI);
      });
      
      ///////////////////////////////////////////////////////
      // Arraty methods Practices
      const bankDepositSum = accounts
      .flatMap(acc => acc.movements)
      .filter(move => move > 0)
      .reduce((acc, move) => acc + move, 0);
      console.log(bankDepositSum);
      */

// Challenge 1
/* 
const checkDogs = (arr1, arr2) => {
  const arrCopy1 = arr1.slice(1, -2);
  const allDogs = [...arrCopy1, ...arr2];

  allDogs.forEach(dog => {
    console.log(`age: ${dog} ${dog > 2 ? 'adult' : 'puppy'}`);
  });
};

const dogsJulia = [3, 5, 2, 12, 7];
const dogsJulia2 = [9, 16, 6, 8, 3];

const dogsKate = [4, 1, 15, 8, 3];
const dogsKate2 = [10, 5, 6, 1, 4];

checkDogs(dogsJulia, dogsKate);
checkDogs(dogsJulia2, dogsKate2);
 */
/* , */
/* 
const eurToUsd = 1.1;

const movementsUSD = movements.map(move => move * eurToUsd);
console.log(movements);
console.log(movementsUSD);

const deposit = movements.filter(move => move > 0).filter(move => move < 500);

console.log(deposit);

const withdrawals = movements.filter(move => move < 0);
console.log(withdrawals);

// Accumulator is lika a snowball
const balance = movements.reduce((acc, curr, i) => acc + curr, 0);

console.log(balance);

const max = movements.reduce((acc, move) => (acc > move ? acc : move));

console.log(max);

const firstRedrawal = movements.find(move => move < 0);
console.log(movements);
console.log(firstRedrawal);

*/
// Challenge 4
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);
// console.log(dogs);

// Calculate 10 %
// current > (recommended * 0.90) && current < (recommended *1.10)

// 2.
const sd = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarahs dog is eating too ${
    sd.curFood > sd.recommendedFood ? 'much' : 'little'
  }`
);

// 3.
const ownersToMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .map(dog => dog.owners)
  .flat();
console.log(ownersToMuch);

const ownersToLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersToLittle);

// 4.
// Matilda and Alice and Bob's dogs eat too much!
// Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersToMuch.join(' and ')}'s dogs eat too much!`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

const calcFood = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;
// 6.
// current > (recommended * 0.90) && current < (recommended *1.10)
console.log(dogs.some(calcFood));

// 7.
// const dogsEatingOk = dogs.filter(
//   dog =>
//     dog.curFood > dog.recommendedFood * 0.9 &&
//     dog.curFood < dog.recommendedFood * 1.1
// );
console.log(dogs.filter(calcFood));

// 8.
//movements.sort((a, b) => a - b);
const dogsCopy = Array.from(dogs);
console.log(dogsCopy.sort((a, b) => a.recommendedFood - b.recommendedFood));
console.log(dogs);
