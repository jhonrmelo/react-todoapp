import React, { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem'
import AddTodo from './components/addTodo'
import { addTodo, deletedTodo, getTodos, updateTodo } from './API'
import { ITodo } from './type'


const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
      .catch((err: Error) => console.log(err))
  }

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault()
    addTodo(formData).then(({ status, data }) => {
      if (status !== 201) {
        throw new Error("Todo não foi salvo")
      }
      setTodos(data.todos)
    })
      .catch(err => console.log(err))
  }
  const handleUpdatedTodo = (formData: ITodo): void => {
    updateTodo(formData).then(({ status, data }) => {
      if (status !== 200) {
        throw new Error("Todo não foi atualizados")
      }
      setTodos(data.todos)
    })
      .catch(err => console.log(err))
  }

  const handleDeleteTodo = (_id: string): void => {
    deletedTodo(_id).then(({ status, data }) => {
      if (status !== 200) {
        throw new Error("Todo não foi atualizados")
      }
      setTodos(data.todos)
    })
      .catch(err => console.log(err))
  }

  return (
    <main className="App">
      <h1>Minha lista</h1>
      <AddTodo saveTodo={handleSaveTodo}></AddTodo>
      {
        todos.map((todo: ITodo) => (
          <TodoItem
            key={todo._id}
            updateTodo={handleUpdatedTodo}
            deleteTodo={handleDeleteTodo}
            todo={todo}>

          </TodoItem>
        ))
      }
    </main>
  )
}
