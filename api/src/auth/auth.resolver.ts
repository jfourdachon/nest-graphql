import * as bcryptjs from 'bcryptjs';
import { Response } from 'express';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ResGql } from '../decorators/decorators';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, SignupDto } from './auth-dto';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';

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

    //TODO
    // @Mutation(returns => User)
    // async signup(
    //     @Args('signupDto') signupDto: SignupDto,
    //     @ResGql() res: Response,
    // ) {
    //     const emailExists = await this.userService.findByEmail(signupDto.email);
    //     if (emailExists) {
    //         throw Error('Email is already in use');
    //     }
    //     const password = await bcryptjs.hash(signupDto.password, 10);
    //     const user = await this.authSevice.signup(signupDto, password);

    //     const jwt = this.jwt.sign({ id: user.id });
    //     res.cookie('token', jwt, { httpOnly: true });

    //     return user;
    // }
}