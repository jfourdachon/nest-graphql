
import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Model } from 'mongoose';
import { UpdateUserDto } from './user.dto';
import { User, UserDocument } from './user.model';


@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findById(id: string): Promise<User> {
        return this.userModel.findById({_id: id}).exec();
    }

    async findByUsername(username: string): Promise<User> {
        return this.userModel.findOne({ username });
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email });
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

    async updateUser(@Args('updateUserDto') updateUserDto: UpdateUserDto) {
        try {
            const { id, ...dataToUpdate } = updateUserDto
            const updatedUser = await this.userModel.findByIdAndUpdate(id, dataToUpdate)
            return updatedUser
        } catch (error) {
            throw new Error(error)
        }
    }

    //TODO Maybe don't need this method in token is only store in redis
    //    saveRefreshToken = async (id, refreshToken) => {
    //         try {
    //             const updatedUser = await this.userModel.findById(id).exec()
    //             updatedUser.refreshToken = refreshToken
    //             updatedUser.save()
    //             return updatedUser
    //         } catch (error) {
    //             console.log({error})
    //         }
    //     }

    async assignLessonsToUser(userId: string, lessonsIds: string[]): Promise<User> {
        const user = await this.userModel.findById(userId).exec()
        user.lessons = [...user.lessons, ...lessonsIds]
        return user.save()
    }
}
