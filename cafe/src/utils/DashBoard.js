const EventEmitter = require("./EventHandler");
const Events = require("./Events");
const Status = require("./Status");

module.exports = class DashBoard {
  constructor() {
    this.orders = [];

    this.showBoard = this.showBoard.bind(this);

    EventEmitter.on(Events.ORDER_REQUESTED, (order) => this.orders.push(order));
    EventEmitter.on(Events.DRINK_PREPARED, (customerName, drink) => {
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
    // console.log("\033[2J");

    console.log("[DASHBOARD]---------------------------------------");
    this.orders.forEach((order) => {
      order.showDetail();
      console.log("------------------------------------------------");
    });
  }
};
