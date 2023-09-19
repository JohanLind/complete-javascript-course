'use strict';
/*
// Constructor functions

// Does not work with arrow function, because arrow do not use the this keyword
// Convesion to use Capital letter first for constructor functions
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
  // Never do this
  //this.calcAge = function () {
  //  console.log(2037 - this.birthYear);
  //};
};

const johan = new Person('Johan', 1966);

const lena = new Person('Lena', 1989);
// 1. New {} 'empty' object is created
// 2. Function is called, this = {}
// 3. Linked to prototype
// 4. Function automatically return {}
console.log(johan);
console.log(johan instanceof Person);

// Prototypes
console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

johan.calcAge();

console.log(johan.__proto__);
console.log(johan.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(johan));
// true
console.log(Person.prototype.isPrototypeOf(Person));
// false

Person.prototype.species = 'Homo Sapiens';

console.log(johan.species);
console.log(lena.species);
// Homo Sapiens

console.log(johan.hasOwnProperty('firstName'));
// true
console.log(johan.hasOwnProperty('species'));
// false

console.log(johan.__proto__);
console.log(johan.__proto__.__proto__);
console.log(johan.__proto__.__proto__.__proto__);
console.dir(Person.prototype.constructor);

const arr = [7, 4, 5, 4, 7, 5];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototyp);

// Not a good idéa, even though it works
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

console.dir(x => x + 1);
*/
// class expression
// const Person = class {}
/* 
// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hi ${this.firstName}`);
  }

  // Static methods, only accessable on the class level(as you would expect)
  static hey() {
    console.log(`Hi there!`);
    console.log(this);
  }
}

PersonCl.hey();
const jessica = new PersonCl('Jessica', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hi ${this.firstName} :-)`);
// };

jessica.greet();

// 1. Classes are NOT hoisted.
// 2. Classes are first-class citizents.
// 3. Classes are executed in strict mode.

// ES6 sub-classing
class studentCl extends PersonCl {
  constructor(firstName, birthYear, course) {
    // super need to be called first.
    super(firstName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`Hi, my name is ${this.firstName}. I study ${this.course}.`);
  }
  calcAge() {
    console.log(
      `I am ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new studentCl('Martha', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

 // Object Literal
const account = {
  owner: 'Jonas',
  movements: [200, 900, -500, 1300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(move) {
    this.movements.push(move);
  },
};

console.log(account.latest);

account.latest = 300;
console.log(account.movements);

 */
/* 
//
// Object.create
//
//
// The prefered version for Jonas (The teacher) for
// handling Object oriented paradigm in Javascript
//
// We are linking Objects together naturally, rather than "faking object orientation"
//
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();
const sara = Object.create(PersonProto);
sara.init('Sara', 1979);
sara.calcAge;

/////////////////////
// Inheritance between "Classes": Object create
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`Hi, my name is ${this.firstName}. I study ${this.course}.`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();
console.log(jay);
*/

/*
////////////////////////////////////////
// Inheritance between "Classes": Constructor Functions

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};
// Linking prototypes
// The order matter, it has to be right below the constuctor of the sub-class
// child class inherits the prototype from the parent class
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`Hi, my name is ${this.firstName}. I study ${this.course}.`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

const p = new Person('P', 1678);
p.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

*/

// Another class example

// New proposal for improvments in javascript related to classes
// Public fields
// Private fields
// Public methods
// Private methods
/* 
class Account {
  // Public fields (instances)
  locale = navigator.language;

  // Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    //this._movements = []; // underscore, convension for incapsulateing protected
    //this.locale = navigator.language;
    console.log(`Thanks for opening an acoount with us ${this.owner}`);
  }
  // static methods, commonly used as helper methods.
  static helper() {
    console.log('Do something static :-)');
  }

  // Public interface of our object
  getMovements() {
    return this.#movements;
  }
  deposit(val) {
    this.#movements.push(val);
    return this; // Opens up for chaining methods
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }
  // _ Convension for protected method
  // _aproveLoan(val) {
  //   return true;
  // }
  requestLoan(val) {
    if (this.#aproveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
      return this;
    }
  }
  // private method
  #aproveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// Do not do this, open for bugs
// Add a method on the Class instead
//acc1.movements.push(300)
//acc1.movements.push(-100)
// Abstract away to the caller
acc1.deposit(300);
acc1.withdraw(100);
console.log(acc1);
console.log(acc1.getMovements());
Account.helper();

// Chaning
acc1.deposit(100).deposit(399).requestLoan(30000).withdraw(9000);
*/
/* 
//6
// Callenge 1
//
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  console.log((this.speed += 10));
};

Car.prototype.brake = function () {
  console.log((this.speed -= 10));
};

const bmw = new Car('BMV', 100);
const mercedes = new Car('Mercedes', 80);

bmw.brake();
bmw.accelerate();
console.log('-----------');
mercedes.accelerate();
mercedes.brake();
mercedes.brake();
mercedes.brake();

console.log(mercedes.speed);
//
// Challange 2.
//
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  
  accelerate() {
    console.log((this.speed += 10));
  }
  
  brake() {
    console.log((this.speed -= 5));
  }
  
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
ford.accelerate();
console.log(ford.speedUS);
ford.speedUS = 200;
console.log(ford.speedUS);

// Challenge 3.

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  console.log((this.speed += 10));
};

Car.prototype.brake = function () {
  console.log((this.speed -= 10));
};
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} is going at ${this.speed}km/h, with a charge of ${this.charge}%`
    );
  };
  
  const bmw = new Car('BMV', 100);
  const mercedes = new Car('Mercedes', 80);
  
  const tesla = new EV('Tesla', 120, 23);
  console.log(tesla instanceof Car);
  // False
  console.log(tesla instanceof EV);
  
  tesla.brake();
  tesla.chargeBattery(35);
  tesla.accelerate();
  console.log(tesla);
  
  bmw.accelerate();
  bmw.brake();
  
  */
// Challenge 4.
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    console.log((this.speed += 10));
    return this;
  }

  brake() {
    console.log((this.speed -= 5));
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 15;
    this.#charge -= 2;
    console.log(this.speed, this.#charge);
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
rivian.accelerate().accelerate().brake().chargeBattery();
