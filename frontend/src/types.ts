// 1. 공통으로 사용할 할 일(Todo) 데이터 타입 정의
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  date: string; // "YYYY-MM-DD" 형태의 날짜 문자열
}
