const EventEmitter = require("./EventHandler");
const Events = require("./Events");

module.exports = class Queue {
  constructor() {
    this.queue = [];

    EventEmitter.on(Events.ORDER_REQUESTED, (order) =>
      this.addToPendingQueue(order)
    );
  }

  hasPendingOrder() {
    return this.queue.length > 0;
  }

  addToPendingQueue(order) {
    this.queue.push(order);
  }

  // getOrderFromQueueOrNull() {
  //     return (
  //       this.pendingQueue.find((order) => order.getStatus() !== Status.DONE) ||
  //       null
  //     );
  //   }

  getOrderOrNull() {
    if (!this.hasPendingOrder()) {
      return null;
    }
    return this.queue.shift();
  }
};
