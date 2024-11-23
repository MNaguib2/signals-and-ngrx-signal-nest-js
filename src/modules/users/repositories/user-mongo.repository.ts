import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserHydrated } from '../schema/user.schema';
import { Model } from 'mongoose';
import { SignupDto } from '../controllers/DTO/signup.dto';

@Injectable()
export class UserRepository {
  // i will add base repository
  constructor(@InjectModel(User.name) private userModel: Model<UserHydrated>) {}

  async findByUserName(user_name: string) {
    return await this.userModel.findOne({ user_name: user_name });
  }

  async saveUser(user: { user_name: string } & SignupDto) {
    const user_model = await this.userModel.create({
      first_name: user.first_name,
      last_name: user.last_name,
      user_name: user.user_name,
      password: user.password,
      email: user.email,
      phone_number: user.phone,
      // Add other fields if needed
    });
    return user_model.save();
  }
}
