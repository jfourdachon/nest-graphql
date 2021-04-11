import * as bcryptjs from 'bcryptjs';
import { Response } from 'express';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ResGql } from '../decorators/decorators';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, SignupDto } from './auth-dto';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';
import { CreateUserDto } from 'src/user/user.dto';

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly jwt: JwtService,
        private userService: UserService
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


        const jwt = this.jwt.sign({ id: user._id });
        res.cookie('token', jwt, { httpOnly: true });

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
        const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);
        const { password, ...userInfos } = createUserDto
        const user = await this.userService.createUser(userInfos, hashedPassword);

        const jwt = this.jwt.sign({ id: user._id });
        res.cookie('token', jwt, { httpOnly: true });

        return user;
    }
}