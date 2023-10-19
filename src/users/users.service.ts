import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from './users.store';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const newUser = { id: (users.length++).toString(), ...createUserDto };
    users.push(newUser);
    return newUser;
  }

  findAll() {
    return users;
  }

  #findOneIndex(id: number) {
    return users.findIndex(({ id: _id }) => id.toString() === _id);
  }

  #throwIfUserNotFound(id: number) {
    const userInd = this.#findOneIndex(id);
    if (userInd < 0) throw new Error('User not found.');
    return userInd;
  }

  findOne(id: number) {
    const userInd = this.#throwIfUserNotFound(id);
    return users[userInd];
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.#throwIfUserNotFound(id);
    users[userIndex] = {
      ...users[userIndex],
      ...updateUserDto,
      id: id.toString(),
    };
    return users[userIndex];
  }

  remove(id: number) {
    const userIndex = this.#throwIfUserNotFound(id);
    delete users[userIndex];
    return true;
  }
}
