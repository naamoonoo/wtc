import React, { useState } from "react";
import { useTodos } from "../hooks/useTodos";

function TodoForm() {
	const [value, setValue] = useState("");

	const { addTodo } = useTodos();
	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		addTodo(value);
		setValue("");
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					value={value}
					placeholder="입력해주세요"
					onChange={(e) => setValue(e.target.value)}
				/>
				<button>추가</button>
			</form>
		</>
	);
}

export default TodoForm;
