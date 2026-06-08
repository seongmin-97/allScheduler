import { useState, type ChangeEvent, type FormEvent } from 'react'

// 1. TodoInput 컴포넌트가 부모(App.tsx)로부터 전해 받아야 하는 Props의 목록입니다.
interface TodoInputProps {
  // 사용자가 추가 버튼이나 엔터를 눌렀을 때, 완성된 글자(text)를 부모에게 넘겨줄 통로 함수입니다.
  onAddTodo: (text: string) => void;
}

// 2. 실제 입력창 UI와 글자 입력 상태를 관리하는 TodoInput 컴포넌트를 정의합니다.
function TodoInput({ onAddTodo }: TodoInputProps) {
  // [상태의 지역화] 임시 텍스트 상태를 부모가 아닌 이 자식 컴포넌트 내부로 고립시켜 들고 있습니다.
  const [inputValue, setInputValue] = useState<string>('')

  // 글자가 타이핑될 때마다 자식 내부의 inputValue 상태만 변경합니다. (이때 부모는 리렌더링되지 않습니다.)
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  // 사용자가 추가 버튼이나 엔터를 쳐서 제출했을 때 작동하는 내부 함수입니다.
  const handleSubmit = (e: FormEvent) => {
    // 폼 제출 시 브라우저가 화면을 리프레시하는 기본 동작 정지
    e.preventDefault()

    // 텍스트 앞뒤 공백을 자른 최종 값이 비어있다면 전송을 차단
    if (!inputValue.trim()) return

    // [핵심] 부모가 Props로 쥐여준 통로 함수(onAddTodo)에 완성된 inputValue를 태워 보냅니다.
    onAddTodo(inputValue)

    // 전송 완료 후 입력란 상태를 깨끗이 비워줍니다.
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="todo-input-form">
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
  )
}

export default TodoInput

