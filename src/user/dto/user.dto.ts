import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  email: string;
  name: string;
  role: string;
  password: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
