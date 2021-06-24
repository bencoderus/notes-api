import { NextFunction, Request, Response } from "express";
import AuthService from "../../services/auth.service";
import { unauthorizedResponse } from "../../utils/response";

export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers["authorization"];
  const token = authorization && authorization.split(" ")[1];

  if (!token) {
    return unauthorizedResponse(res, "Authorization token is not set");
  }

  const { error, user } = AuthService.verifyToken(token);

  if (error) {
    return unauthorizedResponse(res, "Unauthorized token");
  }

  req.user = user;

  next();
};
