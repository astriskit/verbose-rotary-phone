import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    description: 'email',
  })
  username: string;

  @ApiProperty({
    description: 'password',
  })
  password: string;

  @ApiPropertyOptional({
    description: 'role',
    enum: ['Signer', 'Signee'],
  })
  role: string;
}
