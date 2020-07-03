class Order {
  constructor(drinks) {
    this.drinks = drinks;
  }

  showDetail() {
    this.drinks.forEach((drink) => drink.showDetailInfo());
  }

  hasDrink() {
    return this.drinks.length !== 0;
  }

  getDrink() {
    return this.drinks.shift();
  }
}
