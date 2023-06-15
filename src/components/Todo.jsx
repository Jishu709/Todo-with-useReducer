import React from "react";
import { useState } from "react";
import { ACTIONS } from "../App";
const styles = {
	color: "gray",
	textDecoration: "strike-through",
};

export default function Todo(props) {
	const { dispatch, todo } = props;
	const { id, name, completed } = todo;
	const [editMode, setEditMode] = useState(false);
	const [newName, setNewName] = useState(name);

	function handleSubmit(e) {
		e.preventDefault();
		dispatch({ type: ACTIONS.EDIT_TODO, payload: { id: id, name: newName } });
		setEditMode(false);
	}
	return (
		<div className='todo'>
			{/* <span className={completed ? "done" : "undone"}>{name}</span> */}
			{editMode ? (
				<form onSubmit={handleSubmit}>
					<input
						onChange={(e) => {
							setNewName(e.target.value);
						}}
						value={newName}
					></input>
					<button type='submit'>{editMode ? "Done" : "Edit"}</button>
				</form>
			) : (
				<span className={completed ? "done" : "undone"}>{name}</span>
			)}

			{/* <span className={completed ? "done" : "undone"}>{name}</span> */}
			<button
				// onClick={() => dispatch({ type: ACTIONS.EDIT_TODO, payload: { id } })}
				onClick={() => setEditMode(!editMode)}
			>
				edit
			</button>
			<button
				title='finished?'
				onClick={() =>
					dispatch({ type: ACTIONS.DONE_TODO, payload: { id: id } })
				}
			>
				✔️
			</button>
			<button
				title='move to trash'
				onClick={() =>
					dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: id } })
				}
			>
				❌
			</button>
		</div>
	);
}
