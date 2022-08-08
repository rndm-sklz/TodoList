import React, { useContext, useState, useEffect } from "react"
import PropTypes from 'prop-types'
import Context from "../context"
function TodoItem({ todo: { id, title, completed }, index, onChange, onEditSave }) {
	const { removeTodo } = useContext(Context)
	const [isEditTodo, setIsEditTodo] = useState(false) //TODO: switch to false
	const [editableTitle, setEditableTitle] = useState(title)

	function onEditSaveTodo () {
		onEditSave(id, editableTitle);
		setIsEditTodo(false);
	}

	useEffect(() => {
		if (isEditTodo === true) {
			setEditableTitle(title)
		}
	}, [isEditTodo, title])

	return isEditTodo ? (
		<li className='todo-item'>
			<span>
				<input
				className='todo-edit-input'
					value={editableTitle}
					onChange={(event) => setEditableTitle(event.target.value)}
				/>
			</span>
			<button onClick={onEditSaveTodo}>Save</button>
			<button onClick={() => setIsEditTodo(false)}>Cancel</button>
		</li>
	) : (
		<li className='todo-item'>
			<span className={`${completed ? 'done' : ''}`}>
				<input
					type='checkbox'
					checked={completed}
					className='todo-check'
					onChange={() => onChange(id)}></input>
				<strong>{index + 1}</strong>
				&nbsp;
				{title}
			</span>
			<button onClick={() => setIsEditTodo(true)}>Edit</button>
			<button className="rm" onClick={removeTodo.bind(null, id)}>&times;</button>
		</li>
	)
}

TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
	index: PropTypes.number,
	onChange: PropTypes.func.isRequired,
}

export default TodoItem