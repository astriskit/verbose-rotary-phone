import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocsService } from './docs.service';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';

@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Post()
  create(@Body() createDocDto: CreateDocDto) {
    return this.docsService.create(createDocDto);
  }

  @Get()
  findAll() {
    const currentUserId = undefined; // FIX_ME
    return this.docsService.findAll(currentUserId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const currentUserId = undefined; // FIX_ME
    return this.docsService.findOne(+id, currentUserId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocDto: UpdateDocDto) {
    const currentUserId = undefined; // FIX_ME
    return this.docsService.update(+id, currentUserId, updateDocDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const currentUser = undefined; // FIX_ME
    return this.docsService.remove(+id, currentUser);
  }

  @Patch(':id/sign')
  sign(@Param('id') id: string) {
    const signer = undefined; // FIX_ME
    this.docsService.sign(+id, signer);
  }

  @Delete(':id/recall')
  recall(@Param('id') id: string) {
    const owner = undefined; // FIX_ME
    this.docsService.recall(+id, owner);
  }
}
