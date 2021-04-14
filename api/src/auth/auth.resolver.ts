import * as bcryptjs from 'bcryptjs';
import { Response } from 'express';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ResGql, Cookies, GqlUser } from '../shrared/decorators/decorators';
import { JwtService } from '@nestjs/jwt';
import { EmailDto, LoginDto, resetPasswordDto } from './auth-dto';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';
import { CreateUserDto } from 'src/user/user.dto';
import { RefreshToken, Token } from 'src/shrared/types';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import * as crypto from 'crypto'

import { MailgunService } from '@nextnm/nestjs-mailgun';
import { EmailOptions } from '@nextnm/nestjs-mailgun'

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private readonly jwtService: JwtService,
        private cacheManager: RedisCacheService,
        private mailgunService: MailgunService
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

        const tokens = await this.authService.generateToken({ userId: user._id })
        res.cookie('accessToken', tokens.accessToken, { httpOnly: true });
        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });


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

    @Mutation(returns => RefreshToken)
    async refreshToken(@Cookies() cookie: any, @ResGql() res: Response) {
        try {
            const { accessToken, refreshToken } = cookie
            const userId = await this.jwtService.decode(accessToken)['userId'];

            const tokenFromRedis = await this.cacheManager.get(userId.toString())
            if (tokenFromRedis === refreshToken) {
                const newTokens = await this.authService.refreshToken(userId);

                res.cookie('accessToken', newTokens.accessToken, { httpOnly: true });
                res.cookie('refreshToken', newTokens.refreshToken, { httpOnly: true });

                //TODO setup bcrypt operations in a new thread
                // const hashedRefreshToken = await bcryptjs.hash(refreshToken, 10)
                return { isRefresh: true }
            } else {
                return { isRefresh: false }
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    @Mutation(returns => RefreshToken)
    async resetPasswordRequest(@Args('emailDto') emailDto: EmailDto, @ResGql() res: Response) {
        const user = await this.userService.findByEmail(emailDto.email)
        if (!user) {
            throw new Error("User does not exist");
        }
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        await this.cacheManager.del(user._id.toString())

        const resetPasswordToken = this.jwtService.sign({ userId: user._id }, {
            expiresIn: '15m',
        })

        const hashedResetToken = await  bcryptjs.hash(resetPasswordToken, 10)

        //TODO manage ttl in config -> 15 min
        this.cacheManager.set(user._id.toString(), hashedResetToken, {ttl: 1000})

        //TODO Deep linking App
        const link = `http://localhost:4000/test/?token=${resetPasswordToken}&id=${user._id}`
        const options: EmailOptions = {
            from: 'Super User <me@samples.mailgun.org>',
            to: emailDto.email,
            subject: 'Rest password',
            template: 'test-email',
            'h:X-Mailgun-Variables': `{"link": "${link}"}`
        };
        this.mailgunService.sendEmail(options);

        return { isRefresh: true }

    }

    @Mutation(returns => RefreshToken)
    async resetPassword(@Args('resetPasswordDto') resetPasswordDto: resetPasswordDto,  @ResGql() res: Response) {

        const { userId, password, confirmPassword, token } = resetPasswordDto
        if (password !== confirmPassword) {
            throw new Error('Password does not match confirm password')
        }

        const tokenFromRedis = await this.cacheManager.get(userId.toString())

        const isValid = await bcryptjs.compare(token, tokenFromRedis)
        if (!isValid) {
            throw new Error('Token is invalid')
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        await this.userService.updateUser({ id: userId, password: hashedPassword })

        const newTokens = await this.authService.refreshToken(userId);

        res.cookie('accessToken', newTokens.accessToken, { httpOnly: true });
        res.cookie('refreshToken', newTokens.refreshToken, { httpOnly: true });

        return { isRefresh: true }

    }
}