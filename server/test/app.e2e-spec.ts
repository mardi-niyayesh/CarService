import request from 'supertest';
import {App} from 'supertest/types';
import {AppModule} from '@/app.module';
import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';

describe('AppController (e2e)', (): void => {
  let app: INestApplication<App>;

  beforeAll(async (): Promise<void> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ GET ', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200);
  });

  afterAll(async (): Promise<void> => {
    await app.close();
  });
});
