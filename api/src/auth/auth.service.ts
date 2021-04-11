
import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async validate({ id }) {
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw Error('Authenticate validation error');
        }
        return user;
    }

}
