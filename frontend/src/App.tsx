import { useState, type ChangeEvent, type FormEvent } from 'react'
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

  // 사용자가 입력창에 타이핑하는 한 글자 한 글자를 저장해두는 문자열(string) 상태입니다.
  const [inputValue, setInputValue] = useState<string>('')

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

  // 사용자가 키보드로 글자를 입력할 때마다 실행되는 함수입니다.
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  // 입력창 옆 추가 버튼을 누르거나 인풋창에서 엔터키를 쳤을 때 실행되는 함수입니다.
  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    }

    setTodos([...todos, newTodo])
    setInputValue('')
  }

  // [새로 추가된 함수]
  // 특정 할 일의 id를 받아와서, 목록에서 제거합니다.
  const handleDeleteTodo = (id: number) => {
    // 1) JavaScript의 filter 함수를 사용합니다.
    // - filter는 조건식에 만족하는(참을 반환하는) 아이템들만 쏙쏙 골라서 '새로운 배열'을 만듭니다.
    // - 즉, "현재 돌고 있는 todo의 id가 내가 삭제하려고 누른 id와 '다르면' 통과시켜라"는 조건입니다.
    const filteredTodos = todos.filter((todo) => todo.id !== id)

    // 2) 내가 삭제하려고 누른 대상을 뺀 나머지로 이루어진 새 배열을 상태에 대입합니다.
    setTodos(filteredTodos)
  }

  return (
    <div className="todo-container">
      <header className="todo-header">
        <h1>AllScheduler</h1>
        <p className="subtitle">오늘의 계획과 습관을 기록해 보세요</p>
      </header>

      <form onSubmit={handleAddTodo} className="todo-input-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="오늘 수행할 계획을 입력해 주세요..."
          className="todo-input"
        />
        <button type="submit" className="todo-add-btn">
          추가
        </button>
      </form>

      <div className="todo-list-wrapper">
        <ul className="todo-list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <div 
                className="todo-checkbox-wrapper"
                onClick={() => handleToggleTodo(todo.id)}
              >
                <span className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}>
                  {todo.completed && '✓'}
                </span>
                <span className="todo-text">{todo.text}</span>
              </div>

              {/* [새로 추가된 영역] 삭제 버튼 */}
              {/* 클릭 시 handleDeleteTodo 함수에 해당 할 일의 id를 넘기며 작동시킵니다. */}
              <button
                type="button"
                onClick={() => handleDeleteTodo(todo.id)}
                className="todo-delete-btn"
                title="삭제"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
