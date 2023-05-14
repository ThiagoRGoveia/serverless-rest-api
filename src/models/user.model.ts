import { CreateUserDto } from '@src/functions/users/dtos/create-user.dto';
import { plainToInstance } from 'class-transformer';

export class User {
  public name!: string;
  public email!: string;
  get pk(): string {
    return '#USER';
  }
  get sk(): string {
    return `#EMAIL_${this.email}`;
  }

  public static fromDto(userDto: CreateUserDto): User {
    return plainToInstance(User, userDto);
  }

  public static fromDynamoDB(item: Record<string, string>): User {
    return plainToInstance(User, item);
  }

  public toDynamoDB(): Record<string, string> {
    return {
      pk: this.pk,
      sk: this.sk,
      name: this.name,
      email: this.email,
    };
  }
}
