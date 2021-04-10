import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './create-student.dto';
import { v4 as uuid } from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument, StudentSchema } from './student.model';
import { Model, Schema as MongooseSchema} from 'mongoose';

@Injectable()
export class StudentService {
    constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) { }

    getById(id: string): Promise<Student> {
        return this.studentModel.findOne({id}).exec()
    }

    getAll(): Promise<Student[]> {
        return this.studentModel.find().exec()
    }

    async getManyStudents(sudentsIds: string[]): Promise<Student[]> {
        return this.studentModel.find({
            where: {
                id: {
                    $in: sudentsIds
                }
            }
        }).exec()
    }

    async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
        const { firstname, lastname, lessons } = createStudentDto
        const newStudent = new this.studentModel({
            id: uuid(),
            firstname,
            lastname,
            lessons
        })
        return newStudent.save()
    }

    async assignLessonsToStudent(studentId: string, lessonsIds: string[]): Promise<Student> {
        const student = await this.studentModel.findOne({ id: studentId }).exec()
        student.lessons = [...student.lessons, ...lessonsIds]
        return student.save()
    }
}
