import { Injectable } from '@nestjs/common';
import { SignupDto } from '../controllers/DTO/signup.dto';
import { UserRepository } from '../repositories/user-mongo.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async signupUser(user: SignupDto) {
    let checked_user_name;
    const excludeNumbers = [];
    let user_name;
    do {
      user_name = this.generateUserName(
        user.first_name,
        user.last_name,
        excludeNumbers,
      );
      const match = user_name.match(/\d{2}$/);
      if (match && match[0] && !isNaN(+match[0])) {
        excludeNumbers.push(+match[0]);
      }
      checked_user_name = await this.userRepository.findByUserName(user_name);
    } while (checked_user_name);
    await this.userRepository.saveUser({ ...user, user_name });
    return user;
  }

  generateUserName(
    firstName: string,
    lastName: string,
    excludeNumbers: number[],
  ): string {
    // Capitalize the first letter of the first name
    const firstNameFirstChar = firstName.charAt(0).toUpperCase();
    // Capitalize the first letter of the last name and make the rest lowercase
    const lastNameCapitalized =
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

    // Generate two random numbers excluding numbers in the excludeNumbers array
    let randomNumbers: string;
    do {
      randomNumbers = Math.floor(1000 + Math.random() * 9000)
        .toString()
        .slice(0, 2); // Generate random 2-digit number
    } while (excludeNumbers.includes(Number(randomNumbers)));

    // Combine the components to create the user name
    const userName = `${firstNameFirstChar}${lastNameCapitalized}${randomNumbers}`;
    return userName;
  }
}
