const EventHandler = require("./EventHandler");
const Status = require("./Status");
const Events = require("./Events");
const Drink = require("./Drink");

module.exports = class Barista {
  /**
   *
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
    /**
     * @type {Drink[]}
     */
    this.drinks = [];
  }

  isAvailable() {
    return this.drinks.length < 2;
  }

  /**
   *
   * @param {string} customerName
   * @param {Drink} drink
   */
  perpare(customerName, drink) {
    this.drinks.push(drink);

    setTimeout(() => {
      drink.updateStatus(Status.DONE);
      EventHandler.emit(Events.DRINK_PREPARED, { customerName, drink });
    }, drink.estimatedTime * 1000);
  }

  clearSlot() {
    if (this.drinks.length === 0) {
      return;
    }

    this.drinks = this.drinks.filter((drink) => drink.status !== Status.DONE);
  }

  showWorks() {
    const status = this.drinks.length === 0 ? "FREE" : "WORKING";
    console.log(`[${this.name}] is ${status}`);
    this.drinks.forEach((drink) => drink.showDetailInfo());
    this.clearSlot();
  }
};
