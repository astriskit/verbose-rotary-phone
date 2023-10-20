import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Store } from './store/store';

@Injectable()
export class UsersService {
  constructor(public store: Store) {}

  create(createUserDto: Omit<User, 'id' | 'createdOn'>) {
    const user: User = {
      ...createUserDto,
      id: (++this.store.users.length).toString(),
      createdOn: Date.now(),
    };
    this.store.users.push(user);
    return { id: user.id, username: user.email };
  }

  findAll() {
    return this.store.users;
  }

  #findOneIndex(id: number) {
    return this.store.users.findIndex(({ id: _id }) => id.toString() === _id);
  }

  #throwIfUserNotFound(id: number) {
    const userInd = this.#findOneIndex(id);
    if (userInd < 0) throw new Error('User not found.');
    return userInd;
  }

  findOne(id: number) {
    const userInd = this.#throwIfUserNotFound(id);
    return this.store.users[userInd];
  }

  findByEmail(email: string) {
    const user = this.findAll()
      .filter(Boolean)
      .find(({ email: _email }) => email === _email);
    if (!user) throw new Error('User not found');
    return user;
  }

  update(id: number, updateUserDto: Omit<Partial<User>, 'id'>) {
    const userIndex = this.#throwIfUserNotFound(id);
    this.store.users[userIndex] = {
      ...this.store.users[userIndex],
      ...updateUserDto,
      id: id.toString(),
    };
    return this.store.users[userIndex];
  }

  remove(id: number) {
    const userIndex = this.#throwIfUserNotFound(id);
    delete this.store.users[userIndex];
    return true;
  }
}
