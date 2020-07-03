const EventEmitter = require("./EventHandler");

module.exports = class Queue {
  constructor() {
    this.queue = [];

    EventEmitter.on("AcceptOrder", (drink) => this.addToPendingQueue(drink));
  }

  hasPendingDrink() {
    return this.queue.length !== 0;
  }

  addToPendingQueue(drink) {
    this.queue.push(drink);
    drink.showDetailInfo();
  }

  extractDrink() {
    return this.queue.shift();
  }
};
