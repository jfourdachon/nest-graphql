import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Lesson } from "../lesson/lesson.model";
import { AssignLessonsToUserDto, SignupDto } from "./user.dto";
import { User, UserDocument } from "./user.model";
import { UserService } from "./user.service";
import * as bcryptjs from 'bcryptjs';


@Resolver(of => User)
export class UserResolver {

    constructor(private userService: UserService) {}

    @Query(returns => User)
    users(@Args('username')username: string) {
        return this.userService.findByUsername(username)
    }

    @Query(returns => User, { name: 'user' })
    getUserById(@Args('id') id: string) {
        return this.userService.getUserById(id)
    }

    @Query(returns => [User], { name: 'users' })
    getUsers() {
        return this.userService.getUsers()
    }

    @ResolveField()
    async lessons(@Parent() User: UserDocument) {
            await User.populate({path: 'lessons', model: Lesson.name}).execPopulate()
            return User.lessons
    }

    @Mutation(returns => User)
    async createUser(@Args('signupDto') signupDto: SignupDto) {
       
        const emailExists = await this.userService.findByEmail(signupDto.email);
        if (emailExists) {
            throw Error('Email is already in use');
        }
        const hashedPassword = await bcryptjs.hash(signupDto.password, 10);
        const { password, ...userInfos } = signupDto
        const user = await this.userService.createUser(userInfos, hashedPassword);
        return user
    }

    @Mutation(returns => User)
    assignLessonsToUser(@Args('assignLessonsToUserDto') assignLessonsToUserDto: AssignLessonsToUserDto) {
        const { userId, lessonsIds } = assignLessonsToUserDto
        return this.userService.assignLessonsToUser(userId, lessonsIds)
    }
}