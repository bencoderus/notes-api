import faker from 'faker';
import { getCustomRepository } from 'typeorm';
import User from '../entity/user.entity';
import { slugify } from '../../utils/helpers';
import UserRepository from '../../repositories/user.repository';
import BcryptService from '../../services/bcrypt.service';
import AuthService from '../../services/auth.service';

interface UserTokenInterface {
  user: User;
  token: string | undefined;
}

export default class UserFactory {
  public static async create(data: any = {}): Promise<User> {
    const username = `${faker.name.firstName()} ${faker.name.lastName()}`;

    const repository = getCustomRepository(UserRepository);

    const newUser = await repository.save(
      repository.create({
        firstName: data.firstName ?? faker.name.firstName(),
        lastName: data.lastName ?? faker.name.lastName(),
        username: slugify(data.username ?? username),
        email: data.email ?? faker.internet.email(),
        password: BcryptService.hash('password'),
      })
    );

    return newUser;
  }

  public static async createWithToken(data: any = {}): Promise<UserTokenInterface> {
    const newUser = await this.create(data);
    const { user, token } = await AuthService.generateToken(newUser);

    return { user, token };
  }
}
