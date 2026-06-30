import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import type { Todo } from './todo.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 1. To-Do 전체 리스트 조회 API (GET /todos)
  @Get('todos')
  async getAllTodos(): Promise<Todo[]> {
    return await this.appService.findAll();
  }

  // 2. 새 To-Do 등록 API (POST /todos)
  // - 클라이언트가 HTTP Request Body에 담아 보내는 JSON 데이터를 수신
  @Post('todos')
  async createTodo(
    @Body('text') text: string,
    @Body('date') date: string,
  ): Promise<Todo> {
    return await this.appService.create(text, date);
  }

  // 3. To-Do 상태 완료 토글 API (PATCH /todos/:id/toggle)
  // - URL의 id 파라미터를 ParseIntPipe를 이용해 문자를 숫자형으로 자동 형변환
  @Patch('todos/:id/toggle')
  async toggleTodo(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    const updated = await this.appService.toggle(id);
    if (!updated) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return updated;
  }

  // 4. To-Do 삭제 API (DELETE /todos/:id)
  @Delete('todos/:id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.appService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return { success: true };
  }
}
