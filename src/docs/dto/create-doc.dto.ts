import { OmitType } from '@nestjs/mapped-types';
import { Doc } from '../entities/doc.entity';

export class CreateDocDto extends OmitType(Doc, ['id'] as const) {}
