import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { Store } from './store/store';

@Module({
  providers: [UsersService, Store],
  exports: [UsersService],
})
export class UsersModule {}
