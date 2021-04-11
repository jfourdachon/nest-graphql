import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './student.dto';
import { v4 as uuid } from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './student.model';
import { Model} from 'mongoose';

@Injectable()
export class StudentService {
    constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) { }

    getById(id: string): Promise<Student> {
        return this.studentModel.findOne({id}).exec()
    }

    async getAll(): Promise<Student[]> {
        return await this.studentModel.find().exec()
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
            studentId: uuid(),
            firstname,
            lastname,
            lessons
        })
        return newStudent.save()
    }

    async assignLessonsToStudent(studentId: string, lessonsIds: string[]): Promise<Student> {
        const student = await this.studentModel.findById(studentId).exec()
        student.lessons = [...student.lessons, ...lessonsIds]
        return student.save()
    }
}
