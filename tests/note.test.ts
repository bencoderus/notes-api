import app from '../src/app';
import supertest from 'supertest';
import DatabaseService from '../src/services/database.service';
import UserFactory from '../src/database/factories/user.factory';
import NoteFactory from '../src/database/factories/note.factory';
import User from '../src/database/entity/user.entity';
import faker from 'faker';

let user: User;
let token: string;

beforeAll(async () => {
  await DatabaseService.createConnection();
  const auth = await UserFactory.createWithToken();
  user = auth.user;
  token = 'Bearer ' + auth.token;
});

afterAll(async () => {
  await DatabaseService.closeConnection();
});

const request = supertest(app);

test('A user can create a note', async () => {
  let payload = {
    title: faker.name.firstName(),
    content: faker.name.lastName(),
  };

  const response = await request
    .post('/notes/create')
    .set('Authorization', token)
    .send(payload);

  expect(response.status).toBe(201);
  expect(response.body.status).toBe(true);
  expect(response.body.message).toBe('Note created successfully');
});

test('A user can update a note', async () => {
  let payload = {
    title: faker.name.firstName(),
    content: faker.name.lastName(),
  };
  const note = await NoteFactory.create(user);

  const response = await request
    .put(`/notes/${note.id}/update`)
    .set('Authorization', token)
    .send(payload);

  expect(response.status).toBe(200);
  expect(response.body.status).toBe(true);
});

test('A user can get all his notes', async () => {
  const response = await request.get('/notes').set('Authorization', token);

  expect(response.status).toBe(200);
  expect(response.body.status).toBe(true);
});

test('A user can get a note', async () => {
  const note = await NoteFactory.create(user);

  const response = await request
    .get('/notes/' + note.id)
    .set('Authorization', token);

  expect(response.status).toBe(200);
  expect(response.body.status).toBe(true);
});

test('A user can delete a note', async () => {
  const note = await NoteFactory.create(user);

  const response = await request
    .delete(`/notes/${note.id}/delete`)
    .set('Authorization', token);

  expect(response.status).toBe(200);
  expect(response.body.status).toBe(true);
});
