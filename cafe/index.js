const Cashier = require("./Cashier");
const Queue = require("./Queue");
const Manager = require("./Manager");
const Barista = require("./Barista");

const cashier = new Cashier();
const quque = new Queue();
const barista1 = new Barista();
const barista2 = new Barista();
const barista3 = new Barista();
const manager = new Manager(quque, [], [barista1, barista2, barista3]);

cashier.acceptOrder("americano", 1);
cashier.acceptOrder("latte", 1);
cashier.acceptOrder("americano", 1);
cashier.acceptOrder("latte", 1);
cashier.acceptOrder("americano", 1);
cashier.acceptOrder("latte", 1);
cashier.acceptOrder("americano", 1);
cashier.acceptOrder("latte", 1);
cashier.acceptOrder("americano", 1);
cashier.acceptOrder("latte", 1);
cashier.acceptOrder("latte", 1);
cashier.acceptOrder("latte", 1);
cashier.acceptOrder("latte", 1);
cashier.acceptOrder("latte", 1);
