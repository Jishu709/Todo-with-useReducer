import "./App.css";
import { useState, useReducer } from "react";
import Todo from "./components/Todo";

export const ACTIONS = {
	ADD_TODO: "add-todo",
	DELETE_TODO: "delete-todo",
	DONE_TODO: "done-todo",
	EDIT_TODO: "edit-todo",
};

function newTodo(name) {
	return { name: name, id: Date.now(), completed: false };
}

function reducer(todos, action) {
	switch (action.type) {
		case ACTIONS.ADD_TODO:
			return [...todos, newTodo(action.payload.name)];
		case ACTIONS.DELETE_TODO:
			return todos.filter((todo) => todo.id !== action.payload.id);
		case ACTIONS.DONE_TODO:
			return todos.map((todo) => {
				if (todo.id === action.payload.id) {
					return { ...todo, completed: !todo.completed };
				}
				return todo;
			});

		case ACTIONS.EDIT_TODO:
			return todos.map((todo) => {
				if (todo.id === action.payload.id) {
					return { ...todo, name: action.payload.name };
				}
				return todo;
			});

		default:
			return todos;
	}
}

function App() {
	const [name, setName] = useState("");
	const [todos, dispatch] = useReducer(reducer, []);

	function handleSubmit(e) {
		e.preventDefault();
		dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
		setName("");
	}

	return (
		<>
			<div className='App'>
				<h1>TODOTODOTODO</h1>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						onChange={(e) => setName(e.target.value)}
						value={name}
						placeholder='todo item..'
					></input>
					<button type='submit'>Add</button>
				</form>
				<div>
					{todos.map((todo) => (
						<Todo key={todo.id} todo={todo} dispatch={dispatch} />
					))}
				</div>
			</div>
		</>
	);
}

export default App;
