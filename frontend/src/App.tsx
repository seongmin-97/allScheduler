import { useState } from 'react'
import TodoItem from './components/TodoItem'
import TodoInput from './components/TodoInput'
import Calendar from './components/Calendar'
import { type Todo } from './types'
import './App.css'

// "YYYY-MM-DD" 포맷의 날짜 문자열을 생성하는 헬퍼 함수
const formatDateString = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function App() {
  const todayStr = formatDateString(new Date())

  // 현재 사용자가 달력에서 선택한 날짜 상태 (기본값: 오늘 날짜 문자열)
  const [selectedDate, setSelectedDate] = useState<string>(todayStr)

  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'React 기본 구조 학습하기', completed: true, date: todayStr },
    { id: 2, text: '나만의 To-Do List UI 완성하기', completed: false, date: todayStr },
    { id: 3, text: '스케줄러 달력 컴포넌트 구상하기', completed: false, date: todayStr },
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
      date: selectedDate, // 현재 선택한 날짜 정보 입력
    }

    setTodos([...todos, newTodo])
  }

  // 특정 할 일의 id를 받아와서, 목록에서 제거합니다.
  const handleDeleteTodo = (id: number) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id)
    setTodos(filteredTodos)
  }

  // 현재 선택된 날짜에 해당하는 To-Do 항목들만 필터링합니다.
  const filteredTodos = todos.filter((todo) => todo.date === selectedDate)

  return (
    <div className="todo-container">
      <header className="todo-header">
        <h1>AllScheduler</h1>
        <p className="subtitle">오늘의 계획과 습관을 기록해 보세요</p>
      </header>

      {/* 캘린더와 할 일 목록 영역을 배치하는 2열 레이아웃 */}
      <div className="main-content-layout">
        {/* 달력 영역 컴포넌트 */}
        <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

        {/* 할 일 목록 및 입력 영역 */}
        <div className="todo-list-section">
          <h2 className="selected-date-title">{selectedDate} 계획</h2>
          
          <TodoInput onAddTodo={handleCreateTodo} />

          <div className="todo-list-wrapper">
            <ul className="todo-list">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </ul>
            {filteredTodos.length === 0 && (
              <p className="no-todos">등록된 계획이 없습니다. 오늘 하루를 채워보세요!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
