
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

    async findById(id: string): Promise<User> {
        return this.userModel.findById({ _id: id });
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
}
