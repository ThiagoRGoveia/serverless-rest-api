import { BaseError } from './types';

export class HttpError extends Error {
  statusCode: number;
  constructor({ statusCode, message }: BaseError) {
    super(JSON.stringify(message));
    this.statusCode = statusCode;
  }
}
