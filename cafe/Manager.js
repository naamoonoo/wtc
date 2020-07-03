const EventEmitter = require("./EventHandler");

module.exports = class Manager {
  constructor(queue, dashBoard, baristas) {
    this.queue = queue;
    this.dashBoard = dashBoard;
    this.baristas = baristas;

    this.distribuetDrinkToBarista = this.distribuetDrinkToBarista.bind(this);

    EventEmitter.on("drinkPrepared", (drink) => {
      dashBoard.push(drink);
      console.log(dashBoard);
    });
    setInterval(() => this.distribuetDrinkToBarista(), 1000);
  }

  distribuetDrinkToBarista() {
    console.log("--------------------------------");
    console.log(this.queue);

    if (!this.queue.hasPendingDrink()) {
      return console.log("No drink in pendingQueue");
    }

    const availableBarista = this.getAvailableBaristaOrUndefined();
    if (!availableBarista) {
      return console.log("Whole baristas are working hard now");
    }

    const drink = this.queue.extractDrink();
    drink.updateStatus("making");
    availableBarista.perpare(drink);
  }

  getAvailableBaristaOrUndefined() {
    return this.baristas.find((barista) => barista.isAvailable());
  }
};
