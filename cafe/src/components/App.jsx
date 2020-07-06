import React, { useState, useEffect } from "react";
import { RequestOrders } from "./RequestOrders";
import { DashBoard as DashBoardComponent } from "./DashBoard";

import Queue from "../utils/Queue";
import DashBoard from "../utils/DashBoard";
import Manager from "../utils/Manager";
import Barista from "../utils/Barista";

function App() {
  const [timer, setTimer] = useState(0);
  const [pendingQueue, _] = useState(new Queue());
  const [dashBoard, setDashBoard] = useState(new DashBoard());
  // const pendingQueue = new Queue();
  // const dashBoard = new DashBoard();
  const baristaAndy = new Barista("andy");
  const manager = new Manager(pendingQueue, dashBoard, [baristaAndy]);

  // useEffect(() => {
  //   const ticker = setInterval(() => setTimer(timer + 1), 1000);
  //   return clearInterval(ticker);
  // }, []);
  const [isOrderMode, setOrderMode] = useState(false);

  const toggleOrderMode = () => setOrderMode(!isOrderMode);

  return (
    <div className="App">
      <DashBoardComponent dashBoard={dashBoard} />
      {isOrderMode ? (
        <RequestOrders toggleOrderMode={toggleOrderMode} />
      ) : (
        <button onClick={toggleOrderMode}>Order</button>
      )}
    </div>
  );
}

export default App;
