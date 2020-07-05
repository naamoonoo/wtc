import React, { useState } from "react";
import Drink from "../utils/Drink";
import Cashier from "../utils/Cashier";

export const RequestOrders = ({ toggleOrderMode }) => {
  const drinks = [
    { name: "아메리카노", time: 3 },
    { name: "레몬에이드", time: 5 },
    { name: "라떼", time: 5 },
    { name: "프라푸치노", time: 7 },
    { name: "초코물", time: 5 },
    { name: "빙수", time: 10 },
  ];
  const cachier = new Cashier();
  const [customerName, setCustomerName] = useState("");
  const [drinkSelected, setSelectedDrinkIds] = useState(
    drinks.map((v) => false)
  );

  const onOrderHandler = () => {
    if (!customerName) {
      return alert("We do need a customer name");
    }
    const selectedDrinks = drinks.filter((drink, idx) => drinkSelected[idx]);
    cachier.getOrders(customerName, selectedDrinks);
    toggleOrderMode();
    setCustomerName("");
  };

  const onClickHanlder = (idx) => {
    const updatedDrinkSelected = drinkSelected.map((v, i) =>
      i === idx ? !v : v
    );
    setSelectedDrinkIds(updatedDrinkSelected);
  };

  const renderDrinks = () => {
    const isSelected = (idx) => drinkSelected[idx];
    return drinks.map((drink, idx) => (
      <div key={idx} onClick={() => onClickHanlder(idx)}>
        {drink.name}[{drink.time}]{isSelected(idx) && "V"}
      </div>
    ));
  };

  return (
    <div>
      {renderDrinks()}
      <input
        type="text"
        placeholder="주문이 완료되면 이름을 불러드리겠습니다"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <button onClick={onOrderHandler}>Order</button>
    </div>
  );
};
