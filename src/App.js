import React, { useState, useEffect } from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
import AddTodo from './Todo/AddTodo'
import TodoFilters from './Todo/TodoFilters'


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    let localTodo = JSON.parse(localStorage.getItem('todos'));

    if (localTodo) setTodos(localTodo)

    setIsLoaded(true);
  }, [])

  useEffect(() => {
    if (isLoaded) localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos, isLoaded])

  console.log(localStorage);

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
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function onEditSave (id, title) {
    setTodos(
      todos.map( todo => {
        if (todo.id === id) {
          todo.title = title
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>Todo List</h1>
        <AddTodo onCreate={addTodo} />
        {todos.length ? <TodoList todos={filteredTodos} onToggle={toggleTodo} onEditSave={onEditSave} /> : <p>No todos</p>}
        <TodoFilters setFilter={setFilter} todos={todos}/>
      </div>
    </Context.Provider>
  )
}

export default App;
