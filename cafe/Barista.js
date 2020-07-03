const EventEmitter = require("./EventHandler");

module.exports = class Barista {
  constructor() {
    this.emptySlot = 2;
  }

  isAvailable() {
    return this.emptySlot !== 0;
  }

  perpare(drink) {
    this.emptySlot += 1;
    console.log(drink.name, "is in preparing...");

    setTimeout(() => {
      drink.updateStatus("done");
      console.log(drink.name, "is prepared");
      this.emptySlot -= 1;
      EventEmitter.emit("drinkPrepared", drink);
    }, drink.time * 1000);
  }
};
