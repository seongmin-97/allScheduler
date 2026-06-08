// 1. TodoItem 컴포넌트가 다룰 단일 할 일 데이터의 타입 규격입니다.
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// 2. 이 컴포넌트가 부모(App.tsx)로부터 전해 받아야 하는 데이터와 함수(Props)의 목록입니다.
interface TodoItemProps {
  todo: Todo;                       // 화면에 보여줄 할 일 데이터 객체
  onToggle: (id: number) => void;   // 체크박스를 눌렀을 때 부모에게 실행을 요청할 토글 함수
  onDelete: (id: number) => void;   // 삭제 버튼을 눌렀을 때 부모에게 실행을 요청할 삭제 함수
}

// 3. 부품(TodoItem) 컴포넌트를 정의합니다.
// - 부모로부터 전해받은 props 상자({ todo, onToggle, onDelete })를 풀어서 사용합니다.
function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div 
        className="todo-checkbox-wrapper"
        // 클릭이 일어나면 부모가 쥐여준 토글 통로(onToggle)를 통해 내 id 값을 쏘아 보냅니다.
        onClick={() => onToggle(todo.id)}
      >
        <span className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}>
          {todo.completed && '✓'}
        </span>
        <span className="todo-text">{todo.text}</span>
      </div>

      {/* 클릭이 일어나면 부모가 쥐여준 삭제 통로(onDelete)를 통해 내 id 값을 쏘아 보냅니다. */}
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="todo-delete-btn"
        title="삭제"
      >
        ✕
      </button>
    </li>
  )
}

export default TodoItem

