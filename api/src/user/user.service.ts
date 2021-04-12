
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';


@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findByUsername(username: string): Promise<User> {
        return this.userModel.findOne({ username });
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email });
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        return user
    }

    async getUsers(): Promise<User[]> {
        return this.userModel.find().exec()
    }

    async createUser(userDto, password: string): Promise<User> {
        const user = new this.userModel({
            email: userDto.email,
            username: userDto.email,
            isVegetarian: userDto.isVegetarian,
            password
        })
        return user.save()
    }

   saveRefreshToken = async (id, refreshToken) => {
        try {
            console.log(id, refreshToken)
            const updatedUser = await this.userModel.findById(id).exec()
            console.log({ updatedUser })
            updatedUser.refreshToken = refreshToken
            console.log({ updatedUser })
            updatedUser.save()
            return updatedUser
        } catch (error) {
            console.log({error})
        }
    }

    async assignLessonsToUser(userId: string, lessonsIds: string[]): Promise<User> {
        const user = await this.userModel.findById(userId).exec()
        user.lessons = [...user.lessons, ...lessonsIds]
        return user.save()
    }
}
