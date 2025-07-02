import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('Auth e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        errorHttpStatusCode: 422,
      }),
    );

    await app.init();

    prisma = app.get(PrismaService);
    await prisma.user.deleteMany(); // clean table
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve registrar e autenticar', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'user@stark.com', password: 'password123' })
      .expect(201);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user@stark.com', password: 'password123' })
      .expect(200);

    expect(response.body.token).toBeDefined();
    const refreshToken = response.body.refreshToken;

    // refresh token válido
    const refreshResponse = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken })
      .expect(200);

    expect(refreshResponse.body.token).toBeDefined();

    const meResponse = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${response.body.token}`)
      .expect(200);

    expect(meResponse.body.email).toBe('user@stark.com');
  });

  it('deve retornar 401 para credenciais inválidas', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user@stark.com', password: 'senha_errada' })
      .expect(401);
  });

  it('deve retornar 401 para refresh token inválido', async () => {
    await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken: 'token_invalido' })
      .expect(401);
  });

  it('deve retornar 401 sem token', async () => {
    await request(app.getHttpServer()).get('/users/me').expect(401);
  });
}); 