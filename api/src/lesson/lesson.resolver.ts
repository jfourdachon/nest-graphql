import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { GqlAuthGuard } from "../auth/graphql-auth";
import { GqlUser } from "../shrared/decorators/decorators";
import { AssignUsersToLessonDto, CreateLessonDto } from "./lesson.dto";
import { Lesson, LessonDocument } from "./lesson.model";
import { LessonService } from "./lesson.service";
import { User } from "../user/user.model";


@Resolver(of => Lesson)
export class LessonResolver {

    constructor(private lessonService: LessonService) { }

    @Query(returns => Lesson, { name: 'lesson' })
    getLesson(@Args('lessonId') lessonId: string) {
        return this.lessonService.getLessonById(lessonId)
    }

    @Query(returns => [Lesson], { name: 'lessons' })
    getAllLessons() {
        return this.lessonService.getAllLessons()
    }

    @ResolveField()
    async users(@Parent() Lesson: LessonDocument) {
            await Lesson.populate({ path: 'users', model: User.name }).execPopulate()
            return Lesson.users
    }

    @Mutation(returns => Lesson)
    @UseGuards(GqlAuthGuard)
    createLesson(@Args('createLessonDto') createLessonDto: CreateLessonDto, @GqlUser() user: User) {
        return this.lessonService.createLesson(createLessonDto)
    }

    @Mutation(returns => Lesson)
    async assignUsersToLesson(@Args('assignUsersToLessonDto') assignUsersToLessonDto: AssignUsersToLessonDto) {
        const { lessonId, usersIds } = assignUsersToLessonDto
        const resp = await this.lessonService.assignUsersToLesson(lessonId, usersIds)
        return resp
    }

}