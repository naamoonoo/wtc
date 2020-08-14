import React from "react";
import { useCounter } from "../hooks/useCounter";

function Counter() {
	const { counter, plus, minus } = useCounter();

	return (
		<>
			<button onClick={minus}>-</button>
			<button onClick={plus}>+</button>
			<div>{counter}</div>
		</>
	);
}

export default Counter;
