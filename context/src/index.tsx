import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CounterProvider } from "./context/counterContext";
import { TodosProvider } from "./context/TodosContext";
import { CombineProvider } from "./utils/contextHelper";

const providerWrappedApp = CombineProvider(CounterProvider, TodosProvider)(App);

ReactDOM.render(
	<React.StrictMode>{providerWrappedApp}</React.StrictMode>,
	document.getElementById("root")
);
