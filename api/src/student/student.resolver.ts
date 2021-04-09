import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { LessonService } from "src/lesson/lesson.service";
import { AssignLessonsToStudentsDto } from "./assign-lessons-to-studenst-dto";
import { CreateStudentDto } from "./create-student.dto";
import { Student } from "./student.entity";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";



@Resolver(of => StudentType)
export class StudentResolver {
    constructor(private studentService: StudentService, private lessonService: LessonService) { }

    @Query(returns => StudentType, { name: 'student' })
    getStudentById(@Args('id') id: string) {
        return this.studentService.getById(id)
    }

    @Query(returns => [StudentType], { name: 'students' })
    getStudents() {
        return this.studentService.getAll()
    }

    @ResolveField()
    async lessons(@Parent() student: Student) {
        return this.lessonService.getManyLessons(student.lessons)
    }

    @Mutation(returns => StudentType)
    createStudent(@Args('createStudentDto') createStudentDto: CreateStudentDto) {
        return this.studentService.createStudent(createStudentDto)
    }

    @Mutation(returns => StudentType)
    assignLessonsToStudent(@Args('assignLessonsToStudentDto') assignLessonsToStudentDto: AssignLessonsToStudentsDto) {
        const { studentId, lessonsIds } = assignLessonsToStudentDto
        return this.studentService.assignLessonsToStudent(studentId, lessonsIds)
    }
}