import app from '../src/app';
import supertest from 'supertest';
import DatabaseService from '../src/utils/database-manager';
import UserFactory from '../src/database/factories/user.factory';
import User from '../src/database/entity/user.entity';

let user: User;

beforeAll(async () => {
  await DatabaseService.createConnection();
  user = await UserFactory.create();
});

afterAll(async () => {
  await DatabaseService.closeConnection();
});

const request = supertest(app);

test('A user can not login with an invalid credential', async () => {
  const response = await request.post('/auth/login').send({
    email: user.email,
    password: 'password133',
  });

  expect(response.status).toBe(400);
  expect(response.body.status).toBe(false);
  expect(response.body.message).toBe('Credential is invalid');
});

test('A user can login with valid credential', async () => {
  const response = await request.post('/auth/login').send({
    email: user.email,
    password: 'password',
  });

  expect(response.status).toBe(200);
  expect(response.body.status).toBe(true);
  expect(response.body.message).toBe('Login successful');
});
