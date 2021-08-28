export default class ValidationException extends Error {
  public statusCode: number;

  public errors: any;

  constructor(args: any) {
    super(args);
    this.message = 'Validation error';
    this.statusCode = 422;
    this.errors = args;
  }
}
