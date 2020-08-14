import { useCreator } from "../utils/contextHelper";
import { CounterContexts } from "../context/counterContext";

export const useCounter = () => {
	const [counter, dispatch] = useCreator(CounterContexts);

	const plus = () => dispatch({ type: "ADD" });
	const minus = () => dispatch({ type: "MINUS" });

	return { counter, plus, minus };
};
