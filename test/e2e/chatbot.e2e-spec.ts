import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('Chatbot e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, errorHttpStatusCode: 422 }));
    await app.init();

    prisma = app.get(PrismaService);
    await prisma.user.deleteMany();

    // registrar e login
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'bot@stark.com', password: '12345678' })
      .expect(201);

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'bot@stark.com', password: '12345678' })
      .expect(200);
    token = res.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve responder à mensagem', async () => {
    await request(app.getHttpServer())
      .post('/chatbot/message')
      .set('Authorization', `Bearer ${token}`)
      .send({ message: 'Qual o melhor treino pra hipertrofia?' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.reply).toBeDefined();
      });
  });

  it('deve retornar 400 se mensagem vazia', async () => {
    await request(app.getHttpServer())
      .post('/chatbot/message')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(400);
  });
}); 