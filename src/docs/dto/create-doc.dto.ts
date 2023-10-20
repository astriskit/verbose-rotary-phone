import { ApiProperty } from '@nestjs/swagger';

export class CreateDocDto {
  @ApiProperty({
    description: 'title of the document',
    example: 'xyz.pdf',
  })
  title: string;

  @ApiProperty({
    description: 'location of the file',
    example: 'scheme://axy/asdf',
  })
  location: string;

  @ApiProperty({
    description: 'signers userids',
    example: ['user-id-1', 'user-id-2'],
  })
  signers: string[];

  @ApiProperty({
    description: 'user-id of the creator',
    example: 'my-user-id',
  })
  owner: string;

  @ApiProperty({
    description: 'timestamp of document expiring',
  })
  expiry: number;
}
