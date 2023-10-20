import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'email',
  })
  username: string;

  @ApiProperty({
    description: 'password',
  })
  password: string;
}
