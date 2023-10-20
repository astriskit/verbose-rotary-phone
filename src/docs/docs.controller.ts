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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('docs')
@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create document',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  create(@Body() createDocDto: CreateDocDto) {
    const currentUserId = undefined; // FIX_ME
    return this.docsService.create(createDocDto, currentUserId);
  }

  @ApiOperation({
    summary: "find all the current owner's documents",
  })
  @Get()
  findAll() {
    const currentUserId = undefined; // FIX_ME
    return this.docsService.findAll(currentUserId);
  }

  @ApiOperation({
    summary: 'Gets the document ',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    const currentUserId = undefined; // FIX_ME
    return this.docsService.findOne(+id, currentUserId);
  }

  @ApiOperation({
    summary: 'Update the document',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocDto: UpdateDocDto) {
    const currentUserId = undefined; // FIX_ME
    return this.docsService.update(+id, currentUserId, updateDocDto);
  }

  @ApiOperation({
    summary: 'Delete the document',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    const currentUser = undefined; // FIX_ME
    return this.docsService.remove(+id, currentUser);
  }

  @ApiOperation({
    summary: 'Sign the document; Should be used by the Signer.',
  })
  @Patch(':id/sign')
  sign(@Param('id') id: string) {
    const signer = undefined; // FIX_ME
    this.docsService.sign(+id, signer);
  }

  @ApiOperation({
    summary: 'Recall the document',
  })
  @Delete(':id/recall')
  recall(@Param('id') id: string) {
    const owner = undefined; // FIX_ME
    this.docsService.recall(+id, owner);
  }
}
