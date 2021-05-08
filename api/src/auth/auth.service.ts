
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthUser, Token } from 'src/shrared/types';
import { UserService } from '../user/user.service';
import { SignupDto } from 'src/user/user.dto';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import mongoose, { Types } from 'mongoose'
import { Schema } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private readonly jwtService: JwtService, private cacheManager: RedisCacheService) { 
    }


    async validate({ userId }) {
        try {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw Error('Authenticate validation error');
        }
        return user;
        } catch (error) {
            console.log({error})
        }
    }

    async signup(signupDto: SignupDto): Promise<AuthUser> {

        try {
            const hashedPassword = await bcryptjs.hash(signupDto.password, 10);
            const { password, ...userInfos } = signupDto
            const user = await this.userService.createUser(userInfos, hashedPassword);

            const tokens = await this.generateToken(user._id)
            return {
                user,
                tokens
            };
        } catch (error) {
            throw new Error
        }
    }

    async generateToken(id): Promise<Token> {
        const accessToken = this.jwtService.sign(id, {
            expiresIn: '20m',
        });

        const refreshToken = this.jwtService.sign(id, {
            expiresIn: '30d',
        });

        //TODO manage ttl
        await this.cacheManager.set(id.toString() , refreshToken, {ttl:10000});
        
        // Maybe overkill
        // this.userService.saveRefreshToken(id, refreshToken)

        return {
            accessToken,
            refreshToken,
        };
    }

    refreshToken(id) {
        try {
            return this.generateToken(id);
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
