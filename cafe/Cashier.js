const EventEmitter = require("./EventHandler");

const Drink = require("./Drink");
const Queue = require("./Queue");

module.exports = class Cashier {
  constructor() {}

  acceptOrder(name, quantity) {
    if (quantity <= 0) {
      return console.log("cannot order drink quantity is less than 0");
    }

    while (quantity--) {
      const drink = new Drink(name, (Math.random() * 100) % 5);
      console.log("Thank you for order ", drink.name);
      EventEmitter.emit("AcceptOrder", drink);
    }
  }
};
