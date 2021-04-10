import { ObjectType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';


@ObjectType()
export class SignUpInputDto {
  @IsEmail()
  readonly email: string;

  @MinLength(6)
  readonly password: string;
}