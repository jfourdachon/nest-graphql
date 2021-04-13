import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.model';

@ObjectType()
export class Token {
  @Field({ description: 'JWT access token' })
  accessToken: string;

  @Field({ description: 'JWT refresh token' })
  refreshToken: string;
}

export class AuthUser { 
    tokens: Token
    user: User
}


@ObjectType()
export class RefreshToken {
    @Field({description: 'Is Refresh JWT provided'})
    isRefresh: boolean
}

