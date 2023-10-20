import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DocsService } from './docs.service';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@ApiBearerAuth()
@ApiTags('docs')
@Controller('docs')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles(['Signee'])
  create(@Body() createDocDto: CreateDocDto, @Request() req) {
    const currentUserId = req?.user?.id;
    return this.docsService.create(createDocDto, currentUserId);
  }

  @ApiOperation({
    summary: "find all the current owner's documents",
  })
  @Get()
  @Roles(['Signee'])
  findAll(@Request() req) {
    const currentUserId = req?.user?.id;
    return this.docsService.findAll(currentUserId);
  }

  @ApiOperation({
    summary: 'Gets the document ',
  })
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const currentUserId = req?.user?.id;
    return this.docsService.findOne(+id, currentUserId);
  }

  @ApiOperation({
    summary: 'Update the document',
  })
  @Patch(':id')
  @Roles(['Signee'])
  update(
    @Param('id') id: string,
    @Body() updateDocDto: UpdateDocDto,
    @Request() req,
  ) {
    const currentUserId = req?.user?.id;
    return this.docsService.update(+id, currentUserId, updateDocDto);
  }

  @ApiOperation({
    summary: 'Delete the document',
  })
  @Delete(':id')
  @Roles(['Signee'])
  remove(@Param('id') id: string, @Request() req) {
    const currentUser = req?.user?.id;
    return this.docsService.remove(+id, currentUser);
  }

  @ApiOperation({
    summary: 'Sign the document; Should be used by the Signer.',
  })
  @Patch(':id/sign')
  @Roles(['Signer'])
  sign(@Param('id') id: string, @Request() req) {
    const signer = req?.user?.id;
    this.docsService.sign(+id, signer);
  }

  @ApiOperation({
    summary: 'Recall the document',
  })
  @Delete(':id/recall')
  @Roles(['Signee'])
  recall(@Param('id') id: string, @Request() req) {
    const owner = req?.user?.id;
    this.docsService.recall(+id, owner);
  }
}
