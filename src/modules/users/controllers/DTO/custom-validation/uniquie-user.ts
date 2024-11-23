import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserHydrated } from '@src/modules/users/schema/user.schema';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(@InjectModel(User.name) private userModel: Model<UserHydrated>) {} // to can read inJection must use useContainer in start up or in module
  private model: Model<any>;
  async validate(value: any, args: any): Promise<boolean> {
    const [model, field] = args.constraints;
    const field_property = args.property; // Field being validated
    if (model) {
      this.model = model;
      const query = { [field]: value };
      const record = await this.model.findOne(query);

      return !record; // Return true if no duplicate exists
    }
    const user = await this.userModel.findOne({
      [field || field_property]: value,
    });
    return !user; // Return true if no user exists with the same value
  }

  defaultMessage(args: any): string {
    return `${args.property} already exists`;
  }
}

export function IsUnique(
  validationOptions?: ValidationOptions,
  field?: string, // The field to check for uniqueness
  model?: Model<any>, // The Mongoose model
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, field],
      validator: IsUniqueConstraint,
    });
  };
}
