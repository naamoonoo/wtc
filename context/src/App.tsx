import React from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Counter from "./components/Counter";

import { CounterProvider } from "./context/counterContext";
import { TodosProvider } from "./context/TodosContext";
const App = () => {
	return (
		<>
			{/* <CounterProvider>
				<TodosProvider> */}
			<Counter />
			<TodoForm />
			<TodoList />
			{/* </TodosProvider>
			</CounterProvider> */}
		</>
	);
};

export default App;
