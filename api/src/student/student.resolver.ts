import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Lesson } from "src/lesson/lesson.model";
import { LessonService } from "src/lesson/lesson.service";
import { AssignLessonsToStudentsDto, CreateStudentDto } from "./student.dto";
import { Student, StudentDocument } from "./student.model";
import { StudentService } from "./student.service";



@Resolver(of => Student)
export class StudentResolver {
    constructor(private studentService: StudentService, private lessonService: LessonService) { }

    @Query(returns => Student, { name: 'student' })
    getStudentById(@Args('id') id: string) {
        return this.studentService.getById(id)
    }

    @Query(returns => [Student], { name: 'students' })
    getStudents() {
        return this.studentService.getAll()
    }

    @ResolveField()
    async lessons(@Parent() student: StudentDocument) {
            await student.populate({path: 'lessons', model: Lesson.name}).execPopulate()
            return student.lessons
    }

    @Mutation(returns => Student)
    createStudent(@Args('createStudentDto') createStudentDto: CreateStudentDto) {
        return this.studentService.createStudent(createStudentDto)
    }

    @Mutation(returns => Student)
    assignLessonsToStudent(@Args('assignLessonsToStudentDto') assignLessonsToStudentDto: AssignLessonsToStudentsDto) {
        const { studentId, lessonsIds } = assignLessonsToStudentDto
        return this.studentService.assignLessonsToStudent(studentId, lessonsIds)
    }
}