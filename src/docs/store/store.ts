import { Injectable } from '@nestjs/common';
import { Doc } from '../entities/doc.entity';

@Injectable()
export class Store {
  docs: Doc[] = [];
}
