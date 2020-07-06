const EventHandler = require("./EventHandler");
const Events = require("./Events");
const Status = require("./Status");
const Order = require("./Order");

module.exports = class DashBoard {
  constructor() {
    /**
     * @type {Order[]}
     */
    this.orders = [];

    this.showBoard = this.showBoard.bind(this);

    EventHandler.on(Events.ORDER_REQUESTED, (order) => this.orders.push(order));
    EventHandler.on(Events.DRINK_PREPARED, (customerName, drink) => {
      // this.showBoard();
    });
  }

  findOrderToBePreparedOrNull() {
    return (
      this.orders.find(
        (order) =>
          order.status === Status.PREPARING ||
          (order.status === order.status) === Status.PENDING
      ) || null
    );
  }

  showBoard() {
    console.log("[DASHBOARD]---------------------------------------");
    this.orders.forEach((order) => {
      order.showDetail();
      console.log("------------------------------------------------");
    });
  }
};
