import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class AppService {
  constructor(
    // @InjectRepository 데코레이터를 통해 데이터베이스에 접근할 수 있는 레포지토리(Repository) 인스턴스를 주입받습니다.
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  // 1. 모든 Todo 목록을 데이터베이스에서 비동기 조회하여 반환
  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  // 2. 새 Todo 엔티티를 생성하고 데이터베이스에 안전하게 영구 저장(INSERT)
  async create(text: string, date: string): Promise<Todo> {
    const newTodo = this.todoRepository.create({
      text,
      completed: false,
      date,
    });
    return await this.todoRepository.save(newTodo);
  }

  // 3. 특정 To-Do의 완료 상태를 조회 후 반전(Toggle)하여 업데이트(UPDATE)
  async toggle(id: number): Promise<Todo | null> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (todo) {
      todo.completed = !todo.completed;
      return await this.todoRepository.save(todo);
    }
    return null;
  }

  // 4. 특정 ID의 To-Do 데이터를 데이터베이스에서 삭제(DELETE)
  async delete(id: number): Promise<boolean> {
    const result = await this.todoRepository.delete(id);
    // affected는 영향을 받아 변경된 데이터 행(Row)의 수입니다. 1개 이상 지워졌다면 성공(true)입니다.
    return typeof result.affected === 'number' && result.affected > 0;
  }
}
