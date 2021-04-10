import { Args, Query, Resolver } from "@nestjs/graphql";
import { User } from "./user.model";
import { UserService } from "./user.service";


@Resolver(of => User)
export class UserResolver {

    constructor(private usersService: UserService) {}

    @Query(returns => User)
    users(@Args('username')username: string) {
        return this.usersService.findByUsername(username)
    }
}