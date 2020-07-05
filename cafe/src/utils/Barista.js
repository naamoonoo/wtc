const EventEmitter = require("./EventHandler");
const Status = require("./Status");
const Events = require("./Events");

module.exports = class Barista {
  constructor(name) {
    this.name = name;
    this.emptySlot = 2;
    this.drinks = [];
  }

  isAvailable() {
    return this.emptySlot > 0;
  }

  perpare(customerName, drink) {
    this.emptySlot -= 1;
    // drink.updateStatus(Status.PREPARING);
    // console.log(
    //   `[${this.name}] is preparing ${customerName}'s ${drink.name}...`
    // );
    this.drinks.push(drink);
    // this.showWorks();
    setTimeout(() => {
      drink.updateStatus(Status.DONE);
      console.log(drink.name, "is prepared");
      this.emptySlot += 1;
      EventEmitter.emit(Events.DRINK_PREPARED, { customerName, drink });
    }, drink.estimatedTime * 1000);
  }

  clearSlot() {
    if (this.drinks.length === 0) {
      return;
    }
    this.drinks = this.drinks.filter((drink) => drink.status !== Status.DONE);
  }

  showWorks() {
    const status = this.emptySlot === 2 ? "FREE" : "WORKING";
    console.log(`[${this.name}] is ${status}`);
    this.drinks.forEach((drink) => drink.showDetailInfo());
    this.clearSlot();
  }
};
