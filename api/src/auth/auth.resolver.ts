import * as bcryptjs from 'bcryptjs';
import { Response } from 'express';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ResGql, Cookies, GqlUser } from '../shrared/decorators/decorators';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth-dto';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';
import { CreateUserDto } from 'src/user/user.dto';
import { Token } from 'src/shrared/types';

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly jwt: JwtService,
        private userService: UserService,
        private authService: AuthService,
        private readonly jwtService: JwtService
    ) { }

    @Mutation(returns => User)
    async login(
        @Args('loginDto') { email, password }: LoginDto,
        @ResGql() res: Response,
    ) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw Error('Email or password incorrect');
        }

        const valid = await bcryptjs.compare(password, user.password);
        if (!valid) {
            throw Error('Email or password incorrect');
        }

        const { accessToken, refreshToken } = this.authService.generateToken(user._id)
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });


        return user;
    }

    @Mutation(returns => User)
    async signup(
        @Args('createUserDto') createUserDto: CreateUserDto,
        @ResGql() res: Response,
    ) {
        const emailExists = await this.userService.findByEmail(createUserDto.email);
        if (emailExists) {
            throw Error('Email is already in use');
        }

        const { tokens, user } = await this.authService.signup(createUserDto)

        res.cookie('token', tokens.accessToken, { httpOnly: true });
        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });

        return user;
    }

    @Mutation(returns => User)
    async refreshToken(@Cookies() cookie: any, @ResGql() res: Response) {
        const { refreshToken } = cookie
        const userId = await this.jwtService.decode(refreshToken)['userId'];

        const user = await this.userService.getUserById(userId)

        const newTokens = this.authService.refreshToken(userId);

        this.userService.saveRefreshToken(userId, newTokens.refreshToken)

        res.cookie('accessToken', newTokens.accessToken, { httpOnly: true });
        res.cookie('refreshToken', newTokens.refreshToken, { httpOnly: true });

        // const hashedRefreshToken = await bcryptjs.hash(refreshToken, 10)

        console.log({user})
        return user
    }
}