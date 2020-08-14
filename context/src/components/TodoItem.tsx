import React from "react";
import "./TodoItem.css";
import { Todo } from "../context/TodosContext";
import { useTodos } from "../hooks/useTodos";

export type TodoItemProps = {
	todo: Todo;
};

function TodoItem({ todo }: TodoItemProps) {
	const { removeTodo } = useTodos();

	return (
		<li className={`TodoItem ${todo.completed ? "done" : ""}`}>
			<span className="text">{todo.title}</span>
			<span className="remove" onClick={() => removeTodo(todo.id)}>
				(X)
			</span>
		</li>
	);
}

export default TodoItem;
