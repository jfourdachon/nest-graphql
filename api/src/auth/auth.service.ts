
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/users.entity';
import { UserType } from 'src/users/users.type';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private authRepository: Repository<User>) { }

    async validate({ id }): Promise<UserType> {
        const user = await this.authRepository.findOne({ id });
        if (!user) {
            throw Error('Authenticate validation error');
        }
        return user;
    }

    async findUserByEmail(email: string): Promise<UserType> {
        return this.authRepository.findOne({ where: { email } })
    }


    async signup(signupDto, password): Promise<UserType> {
        const user = this.authRepository.create({
            email: signupDto.email,
            password
        })
        return this.authRepository.save(user)
    }
}
