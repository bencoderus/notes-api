import jwt from 'jsonwebtoken';
import config from '../config';

const jwtSecret = config.jwt.secret;
const expiresIn = config.jwt.expires_in;

export default class AuthToken {
  public static async generateToken(user: any) {
    let token, error;

    try {
      token = jwt.sign({ user }, jwtSecret, { expiresIn });
    } catch (err) {
      error = err;
    }

    return { token, user, error };
  }

  public static verifyToken(token: string) {
    let user, error;

    try {
      const payload: any = jwt.verify(token, jwtSecret);

      user = payload.user;
    } catch (err) {
      error = err;
    }

    return { user, error };
  }
}
