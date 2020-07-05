import React from "react";

export const DashBoard = ({ dashBoard }) => {
  console.log(dashBoard);
  const renderOrder = () => {
    return dashBoard.orders.map((order) => (
      <div>
        {order.getCustomerName()}[{order.getStatus()}]
        <ul>
          {order.requestedDrinks.map((drink) => (
            <li>
              {drink.name} / {drink.status}
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  return <div>{renderOrder()}</div>;
};
