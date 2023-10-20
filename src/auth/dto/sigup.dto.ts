import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SignupDto {
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

  @ApiPropertyOptional({
    description: 'role',
    enum: ['Signer', 'Signee'],
    example: 'Signee',
  })
  role: string;
}
