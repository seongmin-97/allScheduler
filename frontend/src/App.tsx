import { useState } from 'react'
import TodoItem from './components/TodoItem'
import TodoInput from './components/TodoInput'
import './App.css'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'React 기본 구조 학습하기', completed: true },
    { id: 2, text: '나만의 To-Do List UI 완성하기', completed: false },
    { id: 3, text: '스케줄러 달력 컴포넌트 구상하기', completed: false },
  ])

  // 특정 할 일의 id를 매개변수로 받아 그 아이템의 completed(완료 여부)를 토글합니다.
  const handleToggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  // 이제 FormEvent를 처리하고 입력값을 비우는 복잡한 일은 자식이 알아서 하므로, 
  // 부모는 최종 완료된 글자(text)만 인자로 받아 목록 상태에 더해주면 끝입니다.
  const handleCreateTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      completed: false,
    }

    setTodos([...todos, newTodo])
  }

  // 특정 할 일의 id를 받아와서, 목록에서 제거합니다.
  const handleDeleteTodo = (id: number) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id)
    setTodos(filteredTodos)
  }

  return (
    <div className="todo-container">
      <header className="todo-header">
        <h1>AllScheduler</h1>
        <p className="subtitle">오늘의 계획과 습관을 기록해 보세요</p>
      </header>

      <TodoInput onAddTodo={handleCreateTodo} />

      <div className="todo-list-wrapper">
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
