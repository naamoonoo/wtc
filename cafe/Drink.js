// /**
//  * @typedef DrinkStatus = "pending" |
//  */
const EventEmitter = require("./EventHandler");

module.exports = class Drink {
  /**
   *
   * @param {string} name
   */
  constructor(name, time) {
    this.name = name;
    this.time = time;
    this.status = "pending";
  }

  updateStatus(status) {
    this.status = status;
  }

  showDetailInfo() {
    console.log(`${this.name}[${this.time}] is ${this.status}`);
  }
};

// module.exports = Drink;
