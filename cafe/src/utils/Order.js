const EventEmitter = require("./EventHandler");
const Status = require("./Status");

module.exports = class Order {
  constructor(customerName, requestedDrinks) {
    this.customerName = customerName;
    this.requestedDrinks = requestedDrinks;
    this.requestedDrinkCounter = this.requestedDrinks.length;
  }

  // getDetail() {
  //   return `${this.customerName}'s order is ${this.getStatus()}`
  //   // this.drinks.forEach((drink) => drink.showDetailInfo());
  // }

  getStatus() {
    const pendedDrinks = this.getPendedDrinks();

    if (pendedDrinks.length === this.requestedDrinkCounter) {
      return Status.PENDING;
    }

    const preparedDrink = this.requestedDrinks.filter(
      (drink) => drink.status === Status.DONE
    );

    if (preparedDrink.length === this.requestedDrinkCounter) {
      return Status.DONE;
    }

    return Status.PREPARING;
  }

  getPendedDrinks() {
    return this.requestedDrinks.filter(
      (drink) => drink.status === Status.PENDING
    );
  }

  hasDrinkToBePrepared() {
    return this.getPendedDrinks().length !== 0;
  }

  findPendingDrinkOrNull() {
    if (this.getStatus() === Status.DONE) {
      return null;
    }

    if (this.requestedDrinks[0].status === Status.PENDING) {
      const drinkWillBePrepared = this.requestedDrinks.shift();
      this.requestedDrinks.push(drinkWillBePrepared);
      return drinkWillBePrepared;
    }

    return null;
  }

  showDetail() {
    console.log(`${this.customerName}'s order is ${this.getStatus()}`);
    this.requestedDrinks.forEach((drink) => drink.showDetailInfo());
  }
  // // order is not important inside orders per costomer
  // getDrinkForMake() {
  //   return this.requestedDrinks.pop();
  // }

  // addPreparedDrink(drink) {
  //   this.preparedDrinks.push(drink);
  // }

  getCustomerName() {
    return this.customerName;
  }
};
