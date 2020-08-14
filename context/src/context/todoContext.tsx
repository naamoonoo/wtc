import React, {
	createContext,
	Dispatch,
	useReducer,
	useContext,
	ReactElement,
} from "react";

export type Todo = {
	userId?: number;
	id: number;
	title: string;
	completed: boolean;
};

type TodoState = Todo[];

const TodoStateContext = createContext<TodoState | undefined>(undefined);

type TodoAction =
	| { type: "CREATE"; text: string }
	| { type: "TOGGLE"; id: number }
	| { type: "REMOVE"; id: number };

type TodoDispatch = Dispatch<TodoAction>;

const TodoDispatchContext = createContext<TodoDispatch | undefined>(undefined);

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
	switch (action.type) {
		case "CREATE":
			const nextId = Math.max(...state.map((todo) => todo.id)) + 1;
			return state.concat({
				id: nextId,
				title: action.text,
				completed: false,
			});
		case "TOGGLE":
			return state.map((todo) =>
				todo.id === action.id
					? { ...todo, completed: !todo.completed }
					: todo
			);
		case "REMOVE":
			return state.filter((todo) => todo.id !== action.id);
		default:
			throw new Error("존재하지 않는 액션입니다.");
	}
};

const initialTodo: TodoState = [
	{
		id: 1,
		title: "해민갓에게 문안드리기",
		completed: true,
	},
	{
		id: 2,
		title: "치킨먹기",
		completed: true,
	},
	{
		id: 3,
		title: "공부하기",
		completed: false,
	},
];

export const TodoContextProvider: React.FC = ({ children }) => {
	const [todos, dispatch] = useReducer(todoReducer, initialTodo);

	return (
		<TodoDispatchContext.Provider value={dispatch}>
			<TodoStateContext.Provider value={todos}>
				{children}
			</TodoStateContext.Provider>
		</TodoDispatchContext.Provider>
	);
};

export const useTodoState = () => {
	const state = useContext(TodoStateContext);
	if (!state) throw new Error("스테이트 컨텍스트가 존재하지 않습니다");
	return state;
};

export const useTodoDispatch = () => {
	const dispatch = useContext(TodoDispatchContext);
	if (!dispatch) throw new Error("디스패치 컨텍스트가 존재하지 않습니다");
	return dispatch;
};
