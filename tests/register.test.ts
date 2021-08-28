import app from '../src/app';
import supertest from 'supertest';
import faker from 'faker';
import DatabaseService from '../src/utils/database-manager';
import UserFactory from '../src/database/factories/user.factory';

const request = supertest(app);

beforeAll(async () => {
  await DatabaseService.createConnection();
});

afterAll(async () => {
  await DatabaseService.closeConnection();
});

test('A user can create an account', async () => {
  let user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: 'password',
  };

  const response = await request.post('/auth/register').send(user);

  expect(response.status).toBe(201);
  expect(response.body.status).toBe(true);
  expect(response.body.message).toBe('User created successfully');
});

test('A user can not create an account with an existing email', async () => {
  let user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: 'password',
  };

  await UserFactory.create({ email: user.email });

  const response = await request.post('/auth/register').send(user);

  expect(response.status).toBe(400);
  expect(response.body.status).toBe(false);
  expect(response.body.message).toBe('Email is already in use');
});

test('A user can not create an account with an existing username', async () => {
  let user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: 'password',
  };

  await UserFactory.create({ username: user.username });
  const response = await request.post('/auth/register').send(user);

  expect(response.status).toBe(400);
  expect(response.body.status).toBe(false);
  expect(response.body.message).toBe('Username is already in use');
});
