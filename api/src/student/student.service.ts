import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './create-student.dto';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) { }

    getById(id: string): Promise<Student> {
        return this.studentRepository.findOne({ id })
    }

    getAll(): Promise<Student[]> {
        return this.studentRepository.find()
    }

    async getManyStudents(sudentsIds: string[]): Promise<Student[]> {
        return this.studentRepository.find({
            where: {
                id: {
                    $in: sudentsIds
                }
            }
        })
    }

    async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
        const { firstname, lastname, lessons } = createStudentDto
        const newStudent = this.studentRepository.create({
            id: uuid(),
            firstname,
            lastname,
            lessons
        })
        return this.studentRepository.save(newStudent)
    }

    async assignLessonsToStudent(studentId: string, lessonsIds: string[]): Promise<Student> {
        const student = await this.studentRepository.findOne({ id: studentId })
        student.lessons = [...student.lessons, ...lessonsIds]
        return this.studentRepository.save(student)
    }
}
