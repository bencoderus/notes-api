export default class HttpException extends Error {
  public statusCode: number;
  public errors: any;

  constructor(args: any, statusCode: number, errors: any = null) {
    super(args);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
