import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity() 데코레이터는 이 클래스가 데이터베이스의 'todo' 테이블과 매핑됨을 나타냅니다.
@Entity()
export class Todo {
  // @PrimaryGeneratedColumn()은 C++의 auto-increment 키처럼 
  // 데이터가 추가될 때마다 고유한 ID 번호를 순차적으로 자동 생성해 줍니다.
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()은 일반적인 테이블 필드(열)를 뜻합니다.
  @Column()
  text: string;

  // default: false 설정을 통해 새 To-Do가 생성될 때 완료 여부가 기본적으로 거짓(false)으로 채워지게 만듭니다.
  @Column({ default: false })
  completed: boolean;

  // "YYYY-MM-DD" 포맷의 날짜 정보를 담을 열입니다.
  @Column()
  date: string;
}
