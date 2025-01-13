export class HttpException extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = "Not Found") {
    super(message, 404);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = "Bad Request") {
    super(message, 400);
  }
}