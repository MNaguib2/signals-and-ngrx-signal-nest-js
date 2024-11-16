import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  // i will add base repository
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findByUserName(user_name: string) {
    return await this.userModel.findOne({ user_name: user_name });
  }

  async saveUser(user: any) {
    const user_model = await this.userModel.create(user);
    return user_model.save();
  }
}
