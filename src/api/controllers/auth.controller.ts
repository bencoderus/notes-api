import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../../repositories/user.repository';
import { extractValidationMessage } from '../../utils/helpers';
import RegisterValidator from '../validators/register.validator';
import LoginValidator from '../validators/login.validator';
import {
  okResponse,
  badRequestResponse,
  serverErrorResponse,
  validationErrorResponse,
  createdResponse,
} from '../../utils/response';
import User from '../../database/entity/user.entity';
import BcryptService from '../../services/bcrypt.service';
import AuthService from '../../services/auth.service';

export default class AuthController {
  /**
   * Verify user credentials and generate token.
   * @param request
   * @param response
   * @returns Promise<Response>
   */
  public static async login(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const data: any = request.body;

    const User = getCustomRepository(UserRepository);
    const { error } = LoginValidator.validate(data);

    if (error) {
      const message: string = extractValidationMessage(error);
      return validationErrorResponse(response, 'Validation error', {
        error: message,
      });
    }

    try {
      const user: User | undefined = await User.findByEmail(data.email);

      if (!user) {
        return badRequestResponse(response, 'Credential is invalid');
      }

      const passwordIsValid = BcryptService.compare(
        data.password,
        user.password,
      );

      if (!passwordIsValid) {
        return badRequestResponse(response, 'Credential is invalid');
      }

      const { token } = await AuthService.generateToken(user);

      return okResponse(response, 'Login successful', {
        user,
        token,
      });
    } catch (error) {
      return serverErrorResponse(response, 'Server error', error);
    }
  }

  /**
   * Creates a new user and generate a token
   * @param request
   * @param response
   * @returns Promise<Response>
   */
  public static async register(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const data = request.body;

    const User = getCustomRepository(UserRepository);
    const { error } = RegisterValidator.validate(data);

    if (error) {
      const message: string = extractValidationMessage(error);
      return validationErrorResponse(response, 'Validation error', {
        error: message,
      });
    }

    try {
      const emailExists = await User.findByEmail(data.email);
      const usernameExists = await User.findByUsername(data.username);

      if (emailExists) {
        return badRequestResponse(response, 'Email is already in use');
      }

      if (usernameExists) {
        return badRequestResponse(response, 'Username is already in use');
      }

      const password = BcryptService.hash(data.password);

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
    } catch (error) {
      return serverErrorResponse(
        response,
        'Unable to create an account',
        error,
      );
    }
  }
}
