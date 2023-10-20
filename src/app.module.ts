import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DocsModule } from './docs/docs.module';
import { AlertModule } from './alert/alert.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, DocsModule, AlertModule, AuthModule],
})
class AppModule {}

export { AppModule };
