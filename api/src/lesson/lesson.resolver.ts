import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/graphql-auth";
import { GqlUser } from "src/decorators/decorators";
import { Student } from "src/student/student.model";
import { StudentService } from "src/student/student.service";
import { AssignStudentsToLessonDto, CreateLessonDto } from "./lesson.dto";
import { Lesson, LessonDocument } from "./lesson.model";
import { LessonService } from "./lesson.service";
import { Schema as MongooseSchema } from 'mongoose';
import { User } from "src/user/user.model";


@Resolver(of => Lesson)
export class LessonResolver {

    constructor(private lessonService: LessonService, private studentService: StudentService) { }

    @Query(returns => Lesson, { name: 'lesson' })
    getLesson(@Args('lessonId') lessonId: string) {
        return this.lessonService.getLessonById(lessonId)
    }

    @Query(returns => [Lesson], { name: 'lessons' })
    getAllLessons() {
        return this.lessonService.getAllLessons()
    }

    @ResolveField()
    async students(@Parent() lesson: LessonDocument, @Args('populate') populate: boolean) {
        if (populate) {
            await lesson.populate({ path: 'students', model: Student.name }).execPopulate()
            return lesson.students
        }
    }

    @Mutation(returns => Lesson)
    @UseGuards(GqlAuthGuard)
    createLesson(@Args('createLessonDto') createLessonDto: CreateLessonDto, @GqlUser() user: User,) {
        console.log({user})
        return this.lessonService.createLesson(createLessonDto)
    }

    @Mutation(returns => Lesson)
    async assignStudentsToLesson(@Args('assignStudentsToLessonDto') assignStudentsToLessonDto: AssignStudentsToLessonDto) {
        const { lessonId, studentsIds } = assignStudentsToLessonDto
        const resp = await this.lessonService.assignStudentsToLesson(lessonId, studentsIds)
        return resp
    }

}