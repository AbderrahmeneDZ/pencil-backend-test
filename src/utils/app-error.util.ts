export class AppError extends Error {
  code: number;
  message: string;
  constructor(message: string, code: number = 500) {
    super(message);
    this.code = code;
    this.message = message;
  }
}
