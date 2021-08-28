import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../../repositories/user.repository';
import { extractValidationMessage } from '../../utils/helpers';
import RegisterValidator from '../validators/register.validator';
import LoginValidator from '../validators/login.validator';
import { okResponse, createdResponse } from '../../utils/response';
import User from '../../database/entity/user.entity';
import HashManager from '../../utils/hash-manager';
import AuthService from '../../utils/auth-token';
import HttpException from '../../exceptions/http.exception';
import ValidationException from '../../exceptions/validation.exception';

export default class AuthController {
  /**
   * Verify user credentials and generate token.
   * @param request
   * @param response
   * @returns Promise<Response>
   */
  public static async login(
    request: Request,
    response: Response
  ): Promise<Response> {
    const data: any = request.body;

    const User = getCustomRepository(UserRepository);
    const { error } = LoginValidator.validate(data);

    if (error) {
      const message: string = extractValidationMessage(error);
      throw new ValidationException(message);
    }

    const user: User | undefined = await User.findByEmail(data.email);

    if (!user || !HashManager.compare(data.password, user.password)) {
      throw new HttpException('Credential is invalid', 400);
    }

    const { token } = await AuthService.generateToken(user);

    return okResponse(response, 'Login successful', {
      user,
      token,
    });
  }

  /**
   * Creates a new user and generate a token
   * @param request
   * @param response
   * @returns Promise<Response>
   */
  public static async register(
    request: Request,
    response: Response
  ): Promise<Response> {
    const data = request.body;

    const User = getCustomRepository(UserRepository);
    const { error } = RegisterValidator.validate(data);

    if (error) {
      const message: string = extractValidationMessage(error);
      throw new ValidationException(message);
    }

    const emailExists = await User.findByEmail(data.email);
    const usernameExists = await User.findByUsername(data.username);

    if (emailExists) {
      throw new HttpException('Email is already in use', 400);
    }

    if (usernameExists) {
      throw new HttpException('Username is already in use', 400);
    }

    const password = HashManager.hash(data.password);

    const createdUser: User | undefined = User.create({
      email: data.email,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      password: password,
    });

    const user = await User.save(createdUser);
    const { token } = await AuthService.generateToken(user);

    return createdResponse(response, 'User created successfully', {
      user,
      token,
    });
  }
}
