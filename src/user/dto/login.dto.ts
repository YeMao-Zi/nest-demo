import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
export class LoginDto {
  @Length(2, 20)
  @IsNotEmpty()
  @IsString()
  username: string;

  @Length(6, 20)
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9#$%_-]+$/, {
    message: '密码只能是字母、数字或者 #、$、%、_、- 这些字符',
  })
  password: string;
}
