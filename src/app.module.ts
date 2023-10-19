import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DocsModule } from './docs/docs.module';
import { AlertModule } from './alert/alert.module';

@Module({
  imports: [UsersModule, DocsModule, AlertModule],
})
class AppModule {}

export { AppModule };
