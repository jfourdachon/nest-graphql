import { Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { UserType } from "./users.type";


@Resolver(of => UserType)
export class UserResolver {

    constructor(private usersService: UsersService) {}

    @Query(returns => UserType)
    users() {
        return this.usersService.findOne('john')
    }
}