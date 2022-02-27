import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    description: '使用者名稱',
  })
  public readonly username: string;

  @ApiProperty({
    description: '使用者密碼',
  })
  public readonly password: string;
}
