import { contextCreator } from "../utils/contextHelper";

export type Counter = number;

export type CounterState = Counter;

export type CounterAction = { type: "ADD" } | { type: "MINUS" };

const CounterReducer = (
	state: CounterState,
	action: CounterAction
): CounterState => {
	switch (action.type) {
		case "ADD":
			return state + 1;
		case "MINUS":
			return state - 1;
		default:
			throw new Error("존재하지 않는 액션입니다.");
	}
};

const initialCounter: CounterState = 0;

export const {
	ContextProvider: CounterProvider,
	Contexts: CounterContexts,
} = contextCreator<CounterState, CounterAction>(CounterReducer, initialCounter);
