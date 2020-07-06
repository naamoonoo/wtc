const Status = require("./Status");

module.exports = class Drink {
  /**
   *
   * @param {string} name
   */
  constructor(name, estimatedTime) {
    this.name = name;
    this.estimatedTime = estimatedTime;

    /**
     * @type {DrinkStatus}
     */
    this.status = Status.PENDING;
  }

  /**
   *
   * @param {DrinkStatus} status
   */
  updateStatus(status) {
    this.status = status;
  }

  showDetailInfo() {
    console.log(`\t${this.name}[${this.estimatedTime}s] is ${this.status}`);
  }
};

// module.exports = Drink;
