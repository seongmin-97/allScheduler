import { useState, useEffect } from 'react'
import TodoItem from './components/TodoItem'
import TodoInput from './components/TodoInput'
import Calendar from './components/Calendar'
import { type Todo } from './types'
import './App.css'

// 1. 백엔드 API 서버의 기본 통신 주소 상수를 정의합니다.
const API_URL = 'http://localhost:3000/todos'

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

  // 전체 To-Do 데이터를 담아둘 상태 변수 (빈 배열로 출발)
  const [todos, setTodos] = useState<Todo[]>([])

  // 2. useEffect 훅: 컴포넌트가 브라우저 화면에 마운트(최초 렌더링)되었을 때 
  // 백엔드로부터 데이터베이스에 들어 있는 기존 Todo 데이터를 전송받습니다.
  useEffect(() => {
    fetchTodos()
  }, [])

  // 3. GET /todos API 통신: 데이터베이스 전체 To-Do 조회
  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Network response was not ok')
      const data: Todo[] = await response.json()
      setTodos(data) // 상태 변경으로 인한 리렌더링 유도
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    }
  }

  // 4. PATCH /todos/:id/toggle API 통신: 특정 할 일의 완료 토글
  const handleToggleTodo = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: 'PATCH',
      })
      if (!response.ok) throw new Error('Failed to toggle todo')
      
      const updatedTodo: Todo = await response.json()
      
      // 상태 배열에서 방금 서버가 돌려준 업데이트된 객체 정보만 찾아서 치환합니다.
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return updatedTodo
        }
        return todo
      })
      setTodos(updatedTodos)
    } catch (error) {
      console.error('Failed to toggle todo:', error)
    }
  }

  // 5. POST /todos API 통신: 선택된 날짜에 새 할 일 추가
  const handleCreateTodo = async (text: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          date: selectedDate, // 현재 달력 화면에 기입되어 있던 선택 날짜를 태워 보냄
        }),
      })
      if (!response.ok) throw new Error('Failed to create todo')

      const newTodo: Todo = await response.json()
      setTodos([...todos, newTodo]) // 기존 배열 뒤에 새 투두를 합쳐 렌더링 갱신
    } catch (error) {
      console.error('Failed to create todo:', error)
    }
  }

  // 6. DELETE /todos/:id API 통신: 데이터베이스 행 영구 삭제
  const handleDeleteTodo = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete todo')

      // 서버에서 정상 삭제 확인 패킷을 받으면, 프론트 상태에서도 해당 ID를 필터링하여 지웁니다.
      const filteredTodos = todos.filter((todo) => todo.id !== id)
      setTodos(filteredTodos)
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
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
