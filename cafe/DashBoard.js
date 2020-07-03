class DashBoard {
  constructor() {
    this.orders = [];
  }

  showBoard() {
    this.orders.forEach((order) => order.showDetail());
  }
}
