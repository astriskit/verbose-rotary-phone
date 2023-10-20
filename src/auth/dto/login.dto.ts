import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'email',
    example: 'abc.test@test.test',
  })
  username: string;

  @ApiProperty({
    description: 'password',
    example: 'asdfasdf',
  })
  password: string;
}
