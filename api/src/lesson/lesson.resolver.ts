import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { create } from "node:domain";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonsType, LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {

    constructor(private lessonService: LessonService){}

    @Query(returns => LessonType, {name: 'lesson'})
    getLesson(@Args('id') id: string) {
        return this.lessonService.getLessonById(id)
    }

    @Query(returns => [LessonType], {name: 'lessons'})
    getAllLessons() {
        return this.lessonService.getAllLessons()
    }

    @Mutation(returns => LessonType)
    createLesson(@Args('createLessonInput') createLessonInput: CreateLessonInput) {
        return this.lessonService.createLesson(createLessonInput)
    }

}