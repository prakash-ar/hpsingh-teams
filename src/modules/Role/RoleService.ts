import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '@model/RoleModel';
import { RoleCreateDto } from './dto/RoleDto';
import { User } from '@model/UserModel';
import { ROLE_ATTRIBUTES, USER_ATTRIBUTES } from '@shared/constants/global.constants';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleModel.findAll({include:[{model:User, attributes:USER_ATTRIBUTES}], attributes:ROLE_ATTRIBUTES});
  }

  findOne(id: string): Promise<Role> {
    return this.roleModel.findOne({
      where: {
        id,
      },
    });
  }
  async createRole(data:RoleCreateDto):Promise<RoleCreateDto>{
    return this.roleModel.create({
      name:data.name
    })
  }
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}