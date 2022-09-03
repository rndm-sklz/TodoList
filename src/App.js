import React, { useState, useEffect } from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
import AddTodo from './Todo/AddTodo'
import TodoFilters from './Todo/TodoFilters'


function App() {
	const [todos, setTodos] = useState([]);
	const [filter, setFilter] = useState('all');
	const [filteredTodos, setFilteredTodos] = useState([]);

	useEffect(() => {
		let localTodos = JSON.parse(localStorage.getItem('todos'));
		if (localTodos) setTodos(localTodos)
	}, [])

	useEffect(() => {
		if (filter === 'all') {
			setFilteredTodos(todos);
		} else if (filter === 'active') {
			const activeTodos = todos.filter(todo => !todo.completed);
			setFilteredTodos(activeTodos);
		} else if (filter === 'completed') {
			const completedTodos = todos.filter(todo => todo.completed);
			setFilteredTodos(completedTodos);
		}
	}, [todos, filter])

	function toggleTodo(id) {
		let toggleLocalTodos = todos.map(todo => {
			if (todo.id === id) {
				todo.completed = !todo.completed
			}
			return todo
		});
		setTodos(toggleLocalTodos);
		localStorage.setItem('todos', JSON.stringify(toggleLocalTodos))
	}

	function onEditSave(id, title) {
		let editLocalTodos = todos.map(todo => {
			if (todo.id === id) {
				todo.title = title
			}
			return todo
		});
		setTodos(editLocalTodos);
		localStorage.setItem('todos', JSON.stringify(editLocalTodos))
	}

	function removeTodo(id) {
		let rmLocalTodos = todos.filter(todo => todo.id !== id);
		setTodos(rmLocalTodos);
		localStorage.setItem('todos', JSON.stringify(rmLocalTodos))
	}

	function addTodo(title) {
		let addLocalTodos = todos.concat([{
			title,
			id: Date.now(),
			completed: false
		}]);
		setTodos(addLocalTodos);
		localStorage.setItem('todos', JSON.stringify(addLocalTodos))
	}

	return (
		<Context.Provider value={{ removeTodo }}>
			<div className="wrapper">
				<h1>Todo List</h1>
				<AddTodo onCreate={addTodo} />
				{todos.length ? <TodoList todos={filteredTodos} onToggle={toggleTodo} onEditSave={onEditSave} /> : <p>No todos</p>}
				<TodoFilters setFilter={setFilter} todos={todos} />
			</div>
		</Context.Provider>
	)
}

export default App;
