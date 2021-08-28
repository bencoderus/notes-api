import faker from 'faker';
import { getCustomRepository } from 'typeorm';
import User from '../entity/user.entity';
import { slugify } from '../../utils/helpers';
import UserRepository from '../../repositories/user.repository';
import HashManager from '../../utils/hash-manager';
import AuthService from '../../utils/auth-token';

export default class UserFactory {
  public static async create(data: any = {}): Promise<User> {
    const username = faker.name.firstName() + ' ' + faker.name.lastName();

    let user = {
      firstName: data.firstName ?? faker.name.firstName(),
      lastName: data.lastName ?? faker.name.lastName(),
      username: slugify(data.username ?? username),
      email: data.email ?? faker.internet.email(),
      password: HashManager.hash('password'),
    };

    const repository = getCustomRepository(UserRepository);
    const newUser = repository.save(repository.create(user));

    return newUser;
  }

  public static async createWithToken(data: any = {}) {
    const newUser = await this.create(data);
    const { user, token } = await AuthService.generateToken(newUser);

    return { user, token };
  }
}
