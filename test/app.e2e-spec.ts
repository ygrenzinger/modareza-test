import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('manage staffs', async () => {
    await request(app.getHttpServer())
      .post('/staffs')
      .send({firstName: 'yannick', lastName: 'grenzinger'})
      .set('Accept', 'application/json');

    let response = await request(app.getHttpServer())
      .get('/staffs');
    //expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([{"firstName": "yannick", "id": 1, "lastName": "grenzinger"}]);
    
    await request(app.getHttpServer())
      .delete('/staffs/1');

    response = await request(app.getHttpServer())
      .get('/staffs');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it('manage clients', async () => {
    await request(app.getHttpServer())
      .post('/clients')
      .send({name: 'zara'})
      .set('Accept', 'application/json');

    let response = await request(app.getHttpServer())
      .get('/clients');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([{ "id": 1, "name": "zara"}]);
    
    await request(app.getHttpServer())
      .delete('/clients/1');

    response = await request(app.getHttpServer())
      .get('/clients');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
});
