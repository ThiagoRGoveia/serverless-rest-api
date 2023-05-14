import { HttpError } from '../../src/errors/http.error';
import { validate } from 'class-validator';

export class Validator {
  async validate() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new HttpError({
        statusCode: 400,
        message: errors,
      });
    }
  }
}
