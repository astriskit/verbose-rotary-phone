import { Module } from '@nestjs/common';
import { DocsService } from './docs.service';
import { DocsController } from './docs.controller';
import { UsersModule } from 'src/users/users.module';
import { Store } from './store/store';

@Module({
  imports: [UsersModule],
  controllers: [DocsController],
  providers: [DocsService, Store],
})
export class DocsModule {}
