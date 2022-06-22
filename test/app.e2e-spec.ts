/* eslint-disable prettier/prettier */
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
      .send({ firstName: 'yannick', lastName: 'grenzinger' })
      .set('Accept', 'application/json');

    let response = await request(app.getHttpServer()).get('/staffs');
    //expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([
      { firstName: 'yannick', id: 1, lastName: 'grenzinger' },
    ]);

    await request(app.getHttpServer()).delete('/staffs/1');

    response = await request(app.getHttpServer()).get('/staffs');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it('manage clients', async () => {
    await request(app.getHttpServer())
      .post('/clients')
      .send({ name: 'zara' })
      .set('Accept', 'application/json');

    let response = await request(app.getHttpServer()).get('/clients');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([{ id: 1, name: 'zara' }]);

    await request(app.getHttpServer()).delete('/clients/1');

    response = await request(app.getHttpServer()).get('/clients');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it('manage appointments', async () => {
    const zara = await request(app.getHttpServer())
      .post('/clients')
      .send({ name: 'zara' })
      .set('Accept', 'application/json');

    const dior = await request(app.getHttpServer())
      .post('/clients')
      .send({ name: 'dior' })
      .set('Accept', 'application/json');

    const yannick = await request(app.getHttpServer())
      .post('/staffs')
      .send({ firstName: 'yannick', lastName: 'grenzinger' })
      .set('Accept', 'application/json');

    const stephanie = await request(app.getHttpServer())
      .post('/staffs')
      .send({ firstName: 'stephanie', lastName: 'smith' })
      .set('Accept', 'application/json');
    
    await request(app.getHttpServer())
      .post('/appointments')
      .send({
        clientId: zara.body.id,
        staffId: yannick.body.id,
        startTime: new Date(Date.UTC(2022, 5, 20)).toISOString(),
        endTime: new Date(Date.UTC(2022, 5, 21)).toISOString(),
      })
      .set('Accept', 'application/json');

    await request(app.getHttpServer())
      .post('/appointments')
      .send({
        clientId: dior.body.id,
        staffId: stephanie.body.id,
        startTime: new Date(Date.UTC(2022, 5, 22)).toISOString(),
        endTime: new Date(Date.UTC(2022, 5, 23)).toISOString(),
      })
      .set('Accept', 'application/json');

    const appointments = await request(app.getHttpServer()).get(
      '/appointments',
    );
    expect(appointments.status).toEqual(200);
    expect(appointments.body).toEqual([
      {
        id: 1,
        client:  {
          id: 2,
          name: "zara",
        },
        clientId: 2,
        staff:  {
          id: 2,
          firstName: "yannick",
          lastName: "grenzinger"
        },
        staffId: 2,
        startTime: '2022-06-20T00:00:00.000Z',
        endTime: '2022-06-21T00:00:00.000Z',
      },
      {
        id: 2,
        client:  {
          id: 3,
          name: "dior",
        },
        clientId: 3,
        staff:  {
          id: 3,
          firstName: "stephanie",
          lastName: "smith"
        },
        staffId: 3,
        startTime: '2022-06-22T00:00:00.000Z',
        endTime: '2022-06-23T00:00:00.000Z',
      },
    ]);

    /*
    const appointmentsByClient = await request(app.getHttpServer()).get(
      '/appointments/client/2',
    );
    expect(appointmentsByClient.status).toEqual(200);
    expect(appointmentsByClient.body).toEqual([
      {
        id: 1,
        clientId: 2,
        staffId: 2,
        startTime: '2022-06-19T22:00:00.000Z',
        endTime: '2022-06-20T22:00:00.000Z',
      },
    ]);
    */
  });
});
