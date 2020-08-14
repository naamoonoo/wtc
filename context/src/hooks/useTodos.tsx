import { useCreator } from "../utils/contextHelper";
import { TodosContexts } from "../context/TodosContext";
import Axios from "axios";
import { Todo } from "../context/TodosContext";
import { useEffect } from "react";

export const useTodos = (init = false) => {
	const [todos, dispatch] = useCreator(TodosContexts);

	useEffect(() => {
		if (init === true) {
			fetchTodos();
		}
	}, [init]);

	const fetchTodos = async () => {
		const { data } = await Axios.get<Todo[]>(
			"https://jsonplaceholder.typicode.com/todos"
		);
		dispatch({ type: "GET_TODOS", data });
	};

	const removeTodo = (id: number) => dispatch({ type: "REMOVE_TODO", id });

	const addTodo = (title: string) =>
		dispatch({
			type: "ADD_TODO",
			data: {
				id: todos.length + 1,
				title,
				completed: false,
				userId: 1,
			},
		});

	return { todos, fetchTodos, removeTodo, addTodo };
};
