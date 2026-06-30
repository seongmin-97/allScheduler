import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 서로 다른 도메인/포트 간의 리소스 통신을 허용하기 위해 CORS(Cross-Origin Resource Sharing)를 활성화합니다.
  app.enableCors({
    origin: 'http://localhost:5173', // 프론트엔드 Vite 개발 서버 주소 허용
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // REST API에서 사용할 HTTP Method 목록
    credentials: true, // 향후 쿠키 등을 활용한 세션/인증 처리를 대비해 크레덴셜 통신 허용
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
