import { StatusCodes } from "http-status-codes";

// 400 BAD_REQUEST
// 401 UNAUTHORIZED
// 403 FORBIDDEN
// 404 NOT_FOUND

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthenticatedError";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
