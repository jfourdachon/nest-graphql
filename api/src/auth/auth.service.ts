
import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor() { }

    async validate({ id }) {
        // const user = await this.authRepository.findOne({ id });
        // if (!user) {
        //     throw Error('Authenticate validation error');
        // }
        // return user;
    }

    async findUserByEmail(email: string) {
        // return this.authRepository.findOne({ where: { email } })
    }


    async signup(signupDto, password) {
        // const user = this.authRepository.create({
        //     email: signupDto.email,
        //     password
        // })
        // return this.authRepository.save(user)
    }
}
