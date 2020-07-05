const EventEmitter = require("./EventHandler");
const Status = require("./Status");
const Events = require("./Events");

module.exports = class Manager {
  constructor(pendingQueue, dashBoard, baristas) {
    this.pendingQueue = pendingQueue;
    this.ordersInPrepaing = [];
    this.dashBoard = dashBoard;
    this.baristas = baristas;

    this.distribuetDrinkToBarista = this.distribuetDrinkToBarista.bind(this);

    EventEmitter.on(Events.DRINK_PREPARED, (customerName, drink) => {
      // this.showDashBoard();
    });
    setInterval(() => this.distribuetDrinkToBarista(), 1000);
  }

  distribuetDrinkToBarista() {
    this.showDashBoard();
    const availableBarista = this.getAvailableBaristaOrNull();
    if (!availableBarista) {
      // return console.log("Whole baristas are working hard now");
      return;
    }

    const pendedOrder = this.pendingQueue.getOrderOrNull();
    if (!pendedOrder) {
      // console.log("No drink in pendingQueue");
    } else {
      this.ordersInPrepaing.push(pendedOrder);
    }

    const currentOrder = this.getOrderFromQueueOrNull();

    if (!currentOrder) {
      // return console.log("doby is free");
      return;
    }

    const drink = currentOrder.findPendingDrinkOrNull();
    const customerName = currentOrder.getCustomerName();
    drink.updateStatus(Status.PREPARING);
    this.showDashBoard();
    availableBarista.perpare(customerName, drink);
    this.rotateBaristas();
  }

  getOrderFromQueueOrNull() {
    this.ordersInPrepaing = this.ordersInPrepaing.filter(
      (order) => order.getStatus() !== Status.DONE
    );

    return (
      this.ordersInPrepaing.find((order) => order.hasDrinkToBePrepared()) ||
      null
    );
  }

  getAvailableBaristaOrNull() {
    return this.baristas.find((barista) => barista.isAvailable()) || null;
  }

  rotateBaristas() {
    const firstInQueue = this.baristas.shift();
    this.baristas.push(firstInQueue);
    return firstInQueue;
  }

  showDashBoard() {
    console.clear();
    this.dashBoard.showBoard();
    console.log("[Baristas]----------------------------------------");
    this.baristas.forEach((barista) => barista.showWorks());
  }
};
