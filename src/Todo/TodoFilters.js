import React from 'react'
function TodoFilters(props) {
	function handleFilterAll() {
		props.setFilter('all');
	}

	function handleFilterActive() {
		props.setFilter('active');
	}

	function handleFilterComplete() {
		props.setFilter('completed');
	}
	return (
		<div className="filters-wrapper">
			<p className="remaining" >{props.todos.filter(todo => !todo.completed).length} left</p>
			<button className="filter-btn" onClick={handleFilterAll}>All</button>
			<button className="filter-btn" onClick={handleFilterActive}>Active</button>
			<button className="filter-btn" onClick={handleFilterComplete}>Completed</button>
		</div>
	)
}

export default TodoFilters