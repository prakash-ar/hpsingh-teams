import { Body, Controller, Delete, Get, Param, Post, Put, Response, UseGuards } from '@nestjs/common';
import { User } from '@model/UserModel';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './UserService';
import { UserCreateDto } from './dto/UserCreateDto';
import { UserUpdateDto } from './dto/UserUpdateDto';
import { UserDto } from './dto/UserDto';
import { Role } from '@shared/constants/global.constants';
import { Roles } from '@module/Auth/RolesDecorator';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  @Roles(Role.Admin)
  async getAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':id')
  async getById(@Param("id") id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Roles(Role.Admin)
  @Post('create')
  async createUser(
    @Body() userData: UserCreateDto,
    @Response() res
  ): Promise<UserCreateDto | any> {
    this.userService.createUser(userData).then(result => {
      return res.status(200).send(result)
    }).catch(error => {
      delete error.errors[0].instance
      return res.status(400).send(error.errors[0])
    });
  }

  @Roles(Role.Admin)
  @Put(":id")
  async updateUser(@Body() data: UserUpdateDto, @Param("id") id: string, @Response() res): Promise<UserUpdateDto | any> {
    this.userService.udateUser(data, id).then(result => {
      let message = "Update failed"
      if (result[0]) {
        message = "updated successfully"
      }
      return res.status(200).send({ message })
    }).catch(error => {
      delete error.errors[0].instance
      return res.status(400).send(error.errors[0])
    });
  }

  @Roles(Role.Admin)
  @Delete(":id")
  async deleteUser(@Param("id") id: string, @Response() res): Promise<any> {
    this.userService.remove(id).then(result => {
      res.send({ message: "User deleted successfully" }).status(200)
    }).catch(error => {
      res.status(400).send({ message: "User not found" })
    })

  }
}
