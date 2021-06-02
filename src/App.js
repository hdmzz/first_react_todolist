import React, { useState, useRef, useEffect } from 'react'
import Todolist from './Todolist'
import { v4 as uuid} from 'uuid'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('todos'))
    if (data) setTodos(data)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value 
    console.log(name)
    if (name === '') return
    setTodos([...todos].concat({id: uuid(), name: name, complete: false}))
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
    return (
      <>
      <h1>Liste des tâches aujourd'hui</h1>
        <Todolist todos={todos} toggleTodo={toggleTodo}/>
        <input ref={todoNameRef} type='text'/>
        <button onClick={handleAddTodo}>Ajouter une tache</button>
        <button onClick={handleClearTodos}>Enlever les taches accomplies</button>
        <div>{todos.filter(todo => !todo.complete).length} taches</div>
      </>
    )
}

export default App;
