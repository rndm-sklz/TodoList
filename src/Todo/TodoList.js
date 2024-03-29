import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

function TodoList(props) {
	return (
		<ul className='todo-list'>
			{props.todos.map((todo, index) => {
				return (
					<TodoItem
						todo={todo}
						key={todo.id}
						index={index}
						onEditSave={props.onEditSave}
						onChange={props.onToggle} />
				)
			})}
		</ul>
	)
}

TodoList.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.object).isRequired,
	onToggle: PropTypes.func.isRequired,
	onEditSave: PropTypes.func.isRequired
}

export default TodoList