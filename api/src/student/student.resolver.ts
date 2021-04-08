import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateStudentDto } from "./create-student.dto";
import { Student } from "./student.entity";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";



@Resolver(of => StudentType)
export class StudentResolver {
    constructor(private studentService: StudentService) { }

    @Query(returns => StudentType, { name: 'student' })
    getStudentById(@Args('id') id: string) {
        return this.studentService.getById(id)
    }

    @Query(returns => [StudentType], { name: 'students' })
    getStudents() {
        return this.studentService.getAll()
    }

    @Mutation(returns => StudentType)
    createStudent(@Args('createStudentDto') createStudentDto: CreateStudentDto) {
        return this.studentService.createStudent(createStudentDto)
    }
}