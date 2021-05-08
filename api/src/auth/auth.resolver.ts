import * as bcryptjs from 'bcryptjs';
import { Response } from 'express';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResGql, Cookies, GqlUser } from '../shrared/decorators/decorators';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordRequestDto, LoginDto, resetPasswordDto } from './auth-dto';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';
import { SignupDto } from 'src/user/user.dto';
import { RefreshToken, ForgotPasswordRequest } from 'src/shrared/types';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import * as crypto from 'crypto'

import { MailgunService } from '@nextnm/nestjs-mailgun';
import { EmailOptions } from '@nextnm/nestjs-mailgun'
import { GqlAuthGuard } from './graphql-auth';
import { UseGuards } from '@nestjs/common';

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private readonly jwtService: JwtService,
        private cacheManager: RedisCacheService,
        private mailgunService: MailgunService
    ) { }


    @Query(returns => User)
    @UseGuards(GqlAuthGuard)
    whoAmI(@GqlUser() user: User) {
        return this.userService.findById(user._id);
    }

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
        // res.cookie('accessToken', tokens.accessToken, { httpOnly: true });
        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
        console.log({ tokens, user })


        return {
            token: tokens.accessToken
        };
    }

    @Mutation(returns => User)
    async signup(
        @Args('signupDto') signupDto: SignupDto,
        @ResGql() res: Response,
    ) {
        const emailExists = await this.userService.findByEmail(signupDto.email);
        if (emailExists) {
            throw Error('Email is already in use');
        }

        const { tokens, user } = await this.authService.signup(signupDto)

        // res.cookie('token', tokens.accessToken, { httpOnly: true });
        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });

        return {
            token: tokens.accessToken
        };
    }

    @Mutation(returns => RefreshToken)
    async refreshToken(@Cookies() cookie: any, @ResGql() res: Response) {
        try {
            const { accessToken, refreshToken } = cookie
            const userId = await this.jwtService.decode(accessToken)['userId'];

            const tokenFromRedis = await this.cacheManager.get(userId.toString())
            if (tokenFromRedis === refreshToken) {
                const newTokens = await this.authService.refreshToken(userId);

                // res.cookie('accessToken', newTokens.accessToken, { httpOnly: true });
                res.cookie('refreshToken', newTokens.refreshToken, { httpOnly: true });

                //TODO setup bcrypt operations in a new thread
                // const hashedRefreshToken = await bcryptjs.hash(refreshToken, 10)
                return {
                    token: newTokens.accessToken
                };
            } else {
                throw new Error('Refresh token don\'t match')
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    @Mutation(returns => ForgotPasswordRequest)
    async resetPasswordRequest(@Args('forgotPasswordRequestDto') forgotPasswordRequestDto: ForgotPasswordRequestDto, @ResGql() res: Response) {
        try {
            const user = await this.userService.findByEmail(forgotPasswordRequestDto.email);
            // const user = await this.userService.findByEmail(emailDto.email)
            if (!user) {
                throw new Error("User does not exist");
            }
            res.clearCookie('accessToken')
            res.clearCookie('refreshToken')
            await this.cacheManager.del(user._id.toString())

            const resetPasswordToken = this.jwtService.sign({ userId: user._id }, {
                expiresIn: '15m',
            })

            const hashedResetToken = await bcryptjs.hash(resetPasswordToken, 10)

            //TODO manage ttl in config -> 15 min
            this.cacheManager.set(user._id.toString(), hashedResetToken, { ttl: 1000 })

            //TODO Deep linking App or Linkto website or redirect to API that redirect to APP (for test)
            const link = `http://localhost:4000/test/?token=${resetPasswordToken}&id=${user._id}`
            const options: EmailOptions = {
                from: 'Hello <no-reply@jHello-world.com>',
                to: forgotPasswordRequestDto.email,
                subject: 'Reset password',
                template: 'reset-password-request',
                'h:X-Mailgun-Variables': `{"link": "${link}"}`
            };

            this.mailgunService.sendEmail(options);

            return { isRequestAccepted: true }
        } catch (error) {
            throw new Error(error)
        }

    }

    @Mutation(returns => RefreshToken)
    async resetPassword(@Args('resetPasswordDto') resetPasswordDto: resetPasswordDto, @ResGql() res: Response) {

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

        // res.cookie('accessToken', newTokens.accessToken, { httpOnly: true });
        res.cookie('refreshToken', newTokens.refreshToken, { httpOnly: true });


        return {
            token: newTokens.accessToken
        };

    }
}