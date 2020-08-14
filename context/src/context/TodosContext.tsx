import React from "react";
import { contextCreator } from "../utils/contextHelper";

export type Todo = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

export type TodosState = Todo[];

export type TodosAction =
	| { type: "GET_TODOS"; data: Todo[] }
	| { type: "ADD_TODO"; data: Todo }
	| { type: "REMOVE_TODO"; id: number };

const TodosReducer = (state: TodosState, action: TodosAction): TodosState => {
	switch (action.type) {
		case "GET_TODOS":
			return action.data;
		case "ADD_TODO":
			return [action.data, ...state];
		case "REMOVE_TODO":
			return state.filter((todo) => todo.id !== action.id);
		default:
			throw new Error("존재하지 않는 액션입니다.");
	}
};

const initialTodos: TodosState = [];

export const {
	ContextProvider: TodosProvider,
	Contexts: TodosContexts,
} = contextCreator<TodosState, TodosAction>(TodosReducer, initialTodos);
