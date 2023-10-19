import { PartialType } from '@nestjs/mapped-types';
import { Doc } from '../entities/doc.entity';

export class UpdateDocDto extends PartialType(Doc) {}
