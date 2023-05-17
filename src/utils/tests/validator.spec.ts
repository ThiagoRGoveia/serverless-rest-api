import { validate } from 'class-validator';
import { Validator } from '../validator';
import { HttpError } from '../../../src/errors/http.error';

jest.mock('class-validator', () => ({
  validate: jest.fn(),
}));

describe('Validator', () => {
  let validator: Validator;

  beforeEach(() => {
    validator = new Validator();
    (validate as jest.Mock).mockClear();
  });

  it('should not throw an error if validation passes', async () => {
    (validate as jest.Mock).mockResolvedValue([]);

    await expect(validator.validate()).resolves.not.toThrow();
    expect(validate).toHaveBeenCalledWith(validator);
  });

  it('should throw an HttpError if validation fails', async () => {
    const validationErrors = [
      {
        message: 'This is an error message',
      },
    ];
    (validate as jest.Mock).mockResolvedValue(validationErrors);

    await expect(validator.validate()).rejects.toThrow(HttpError);
    expect(validate).toHaveBeenCalledWith(validator);
  });
});
