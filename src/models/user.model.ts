import { CreateUserDto } from '../functions/users/dtos/create-user.dto';
import { plainToInstance } from 'class-transformer';
import * as uuid from 'uuid';
export class User {
  public name!: string;
  public email!: string;
  public id!: string;
  get pk(): string {
    return '#USER';
  }
  get sk(): string {
    return `#ID#${this.id}`;
  }
  get localId1(): string {
    return `#EMAIL#${this.email}`;
  }

  public generateId(): void {
    this.id = uuid.v4();
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
      id: this.id,
      localId1: this.localId1,
      name: this.name,
      email: this.email,
    };
  }
}
