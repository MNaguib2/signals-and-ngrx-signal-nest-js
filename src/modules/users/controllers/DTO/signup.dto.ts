import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Match } from '@src/modules/global/decorators/match.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', default: '123456' })
  @MinLength(6)
  password: string;

  @IsString()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', default: '123456' })
  @Match('password', { message: 'Confirm password must match password' })
  confirm_password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty({ type: 'string', default: 'test@test.com' })
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber(null, { message: 'Invalid phone number' }) // `null` uses any region
  @ApiProperty({ type: 'string', default: '+201022448327' })
  phone: string;

  @IsString()
  @ApiProperty({ type: 'string', default: 'mena' })
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', default: 'afefe' })
  last_name: string;
}
