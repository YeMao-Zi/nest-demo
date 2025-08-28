import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class RegisterDto {
  @Length(2, 20)
  @IsNotEmpty()
  @IsString()
  username: string;
  @Length(6, 20)
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9#$%_-]+$/, {
    message: '用户名只能是字母、数字或者 #、$、%、_、- 这些字符',
  })
  password: string;
}
