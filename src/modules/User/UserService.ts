import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@model/UserModel';
import { UserCreateDto } from './dto/UserCreateDto';
import { v4 as uuidv4 } from 'uuid';
import { UserUpdateDto } from './dto/UserUpdateDto';
import { USER_ATTRIBUTES } from '@shared/constants/global.constants';
import { Role } from '@model/RoleModel';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<UserCreateDto[]> {
    return this.userModel.findAll({attributes:USER_ATTRIBUTES,include:Role});
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
      attributes:USER_ATTRIBUTES
    });
  }
  async findUserByEmail(email:string):Promise<User>{
    return this.userModel.findOne({
      where: {
        email,
      },
      attributes:USER_ATTRIBUTES
    });
  }

  async findUserByEmailWithAllAttributes(email:string):Promise<User>{
    return this.userModel.findOne({
      where: {
        email,
      }
    });
  }

  async createUser(data: UserCreateDto): Promise<User> {
    return this.userModel.create({
      ...data,id: uuidv4()
    });
  }

  async udateUser(data: UserUpdateDto, id:string): Promise<any> {
    return this.userModel.update({
      ...data,
      id:id
    },{where: {id}, individualHooks: true});
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    user.destroy().then(res=>{
      return res
    }).catch(error => { return error });
  }
}