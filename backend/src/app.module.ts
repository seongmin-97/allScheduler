import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Todo } from './todo.entity';

@Module({
  imports: [
    // SQLite 데이터베이스 연결 옵션을 설정합니다.
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite', // 프로젝트 루트에 생성될 sqlite 파일 이름
      entities: [Todo],            // ORM이 관리할 엔티티 클래스 등록
      synchronize: true,           // 개발용 옵션: 엔티티 코드의 변동사항을 실제 DB 테이블에 즉시 반영
    }),
    // AppModule 내의 다른 서비스(AppService)에서 Todo 엔티티를 주입받아 사용할 수 있도록 설정합니다.
    TypeOrmModule.forFeature([Todo]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
