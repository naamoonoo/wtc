const Cashier = require("./src/utils/Cashier");
const Queue = require("./src/utils/Queue");
const Manager = require("./src/utils/Manager");
const Barista = require("./src/utils/Barista");
const DashBoard = require("./src/utils/DashBoard");

const cashier = new Cashier();
const quque = new Queue();
const dashBoard = new DashBoard();

const barista1 = new Barista("andy");
const barista2 = new Barista("woowa");
const barista3 = new Barista("star");
const manager = new Manager(quque, dashBoard, [barista1, barista2, barista3]);

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// console.log("Please tell me what you want");
// console.log("Tell your name, and orders what you want");
// console.log("andy, latte, americano");
const latte = { name: "라떼", time: 5 };
const ice_ame = { name: "아아", time: 6 };
const hot_ame = { name: "뜨아", time: 7 };
const pura = { name: "푸라푸치노", time: 8 };

cashier.getOrders("A", [latte, ice_ame]);
cashier.getOrders("B", [pura, hot_ame]);
cashier.getOrders("C", [ice_ame]);
cashier.getOrders("D", [pura, pura, ice_ame, hot_ame]);

rl.on("line", function (line) {
  const [customerName, ...names] = line.split(",").map((word) => word.trim());
  const drinks = names.map((name) => {
    const randomTimer = Math.floor(Math.random() * 10);

    return {
      name,
      time: randomTimer,
    };
  });
  cashier.getOrders(customerName, drinks);
});
