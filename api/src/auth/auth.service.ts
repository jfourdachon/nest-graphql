
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthUser, Token } from 'src/shrared/types';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/user.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private readonly jwtService: JwtService) { }

    async validate({ id }) {
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw Error('Authenticate validation error');
        }
        return user;
    }

    async signup(createUserDto: CreateUserDto): Promise<AuthUser> {

        try {
            const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);
            const { password, ...userInfos } = createUserDto
            const user = await this.userService.createUser(userInfos, hashedPassword);

            const tokens = this.generateToken(user._id)
            return {
                user,
                tokens
            };
        } catch (error) {
            throw new Error
        }
    }

    generateToken(id): Token {
        const accessToken = this.jwtService.sign({ userId: id }, {
            expiresIn: '1h',
        });

        const refreshToken = this.jwtService.sign({ userId: id }, {
            expiresIn: '5d',
        });

        this.userService.saveRefreshToken(id, refreshToken)


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
