export default class HttpException extends Error {
  public statusCode: number;

  constructor(args: any, statusCode: number) {
    super(args);
    this.statusCode = statusCode;
  }
}
