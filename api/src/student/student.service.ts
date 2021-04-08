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

    createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
        const { firstname, lastname } = createStudentDto
        const newStudent = this.studentRepository.create({
            id: uuid(),
            firstname,
            lastname
        })
        return this.studentRepository.save(newStudent)
    }
}
