import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { create } from "node:domain";
import { GqlAuthGuard } from "src/auth/graphql-auth";
import { GqlUser } from "src/decorators/decorators";
import { StudentService } from "src/student/student.service";
import { UserType } from "src/users/users.type";
import { AssignStudentsToLessonDto } from "./assign-students-to-lesson-dto";
import { CreateLessonDto } from "./lesson.dto";
import { Lesson } from "./lesson.entity";
import { LessonService } from "./lesson.service";
import {  LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {

    constructor(private lessonService: LessonService, private studentService: StudentService){}

    @Query(returns => LessonType, {name: 'lesson'})
    getLesson(@Args('id') id: string) {
        return this.lessonService.getLessonById(id)
    }

    @Query(returns => [LessonType], {name: 'lessons'})
    getAllLessons() {
        return this.lessonService.getAllLessons()
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        // studentsId come from the lesson parent'
        return this.studentService.getManyStudents(lesson.students)
    }

    @Mutation(returns => LessonType)
    // @UseGuards(GqlAuthGuard)
    createLesson(@Args('createLessonDto') createLessonDto: CreateLessonDto, @GqlUser() user: UserType,) {
        // console.log(user)
        return this.lessonService.createLesson(createLessonDto)
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(@Args ('assignStudentsToLessonDto') assignStudentsToLessonDto: AssignStudentsToLessonDto) {
        const { lessonId, studentsIds } = assignStudentsToLessonDto
        return this.lessonService.assignStudentsToLesson(lessonId, studentsIds)
    }

}