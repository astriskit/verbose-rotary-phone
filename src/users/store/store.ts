import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class Store {
  users: User[] = [
    {
      id: '' + 1,
      email: 'abc.test@test.test',
      password: 'asdfasdf',
      role: 'Signee',
      createdOn: Date.now(),
    },
    {
      id: '' + 2,
      email: 'abc.test.signer@test.test',
      password: 'asdfasdf',
      role: 'Signer',
      createdOn: Date.now(),
    },
  ];
}
