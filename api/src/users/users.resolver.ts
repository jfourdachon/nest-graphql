import { Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";


// @Resolver(of => any)
// export class UserResolver {

//     constructor(private usersService: UsersService) {}

//     @Query(returns => UserType)
//     users() {
//         return this.usersService.findOne('john')
//     }
// }