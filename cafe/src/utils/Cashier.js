const EventEmitter = require("./EventHandler");
const Events = require("./Events");
const Drink = require("./Drink");
const Order = require("./Order");

module.exports = class Cashier {
  constructor() {}

  getOrders(customerName, drinksInfo) {
    const requestedDrinks = drinksInfo.map(({ name, time }) => {
      // const randomTimer = Math.floor(Math.random() * 10);

      return new Drink(name, time);
    });

    const requestedOrder = new Order(customerName, requestedDrinks);

    EventEmitter.emit(Events.ORDER_REQUESTED, requestedOrder);
  }
};
