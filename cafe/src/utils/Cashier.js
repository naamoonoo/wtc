const EventHandler = require("./EventHandler");
const Events = require("./Events");
const Drink = require("./Drink");
const Order = require("./Order");

module.exports = class Cashier {
  constructor() {}

  /**
   *
   * @param {string} customerName
   * @param {{name : string, time: number}} drinksInfo
   */
  getOrders(customerName, drinksInfo) {
    const requestedDrinks = drinksInfo.map(
      ({ name, time }) => new Drink(name, time)
    );

    const requestedOrder = new Order(customerName, requestedDrinks);

    EventHandler.emit(Events.ORDER_REQUESTED, requestedOrder);
  }
};
