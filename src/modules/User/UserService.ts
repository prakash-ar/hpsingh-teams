import { BadRequestException, ForbiddenException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@model/UserModel';
import { UserCreateDto } from './dto/UserCreateDto';
import { v4 as uuidv4 } from 'uuid';
import { UserUpdateDto } from './dto/UserUpdateDto';
import { USER_ATTRIBUTES } from '@shared/constants/global.constants';
import { Role } from '@model/RoleModel';
import { UserRole } from '@model/UserRoleModel';
import { UserDto } from './dto/UserDto';
import { Op } from 'sequelize';
import { UserOtp } from '@model/UserOtpModel';
import moment from 'moment';
import { OtpResponseDto, ValidateOtpDto, ValidateOtpResponseDto } from '@module/Auth/AuthDto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) { }

  async findAll(): Promise<UserDto[]> {
    return this.userModel.findAll({ attributes: USER_ATTRIBUTES, include: [Role] });
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
      attributes: USER_ATTRIBUTES
    });
  }
  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        email,
      },
      attributes: USER_ATTRIBUTES
    });
  }

  async findUserByEmailMobileWithAllAttributes(userName: string): Promise<User> {
    return await this.userModel.findOne({
      where: {
        [Op.or]: [
          { email: userName },
          { mobile: userName }
        ]
      },
      include: [Role],
    });
  }

  async createUser(data: UserCreateDto): Promise<User> {
    return this.userModel.create({
      ...data, id: uuidv4()
    }, { include: [UserRole] });
  }

  async udateUser(data: UserUpdateDto, id: string): Promise<any> {
    return this.userModel.update({
      ...data,
      id: id
    }, { where: { id }, individualHooks: true });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    user.destroy().then(res => {
      return res
    }).catch(error => { return error });
  }

  async generateOtp(mobile: number | string): Promise<OtpResponseDto> {
    const user = await this.userModel.findOne({
      raw: true,
      nest: true,
      where: {
        mobile: mobile
      },
      include: [UserOtp]
    });
    if (!user) {
      throw new NotFoundException('Mobile number not found!');
    }
    if (!user.isActive) {
      throw new ForbiddenException('User not active, contact admin!');
    }

    if (user.userOtp.otp !== null && moment(user.userOtp.expireIn).format("YYYY-MM-DD H:mm:ss") > moment().format("YYYY-MM-DD H:mm:ss")) {
      return {
        otp: user.userOtp.otp,
        status: 'success'
      }
    }
    const userOtpValues = {
      otp: Math.floor(Math.random() * 1000000),
      expireIn: moment().add(15, 'minute').format("YYYY-MM-DD H:mm:ss"),
      userId: user.id
    }
    UserOtp.destroy({ where: { userId: user.id } })
    return await UserOtp.create(userOtpValues).then((res) => {
      return { otp: userOtpValues.otp, status: 'success' }
    }).catch(() => {
      throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
    })

  }

  async validateOtp(reqData: ValidateOtpDto): Promise<any> {
    const user = await this.userModel.findOne({
      where: {
        mobile: reqData.phone
      },
      include: [UserOtp, Role]
    })

    if (!user) {
      throw new NotFoundException('Mobile number not found!');
    }
    if (!user.isActive) {
      throw new ForbiddenException('User not active, contact admin!');
    }
    if (user.userOtp.otp === null || (moment(user.userOtp.expireIn).format("YYYY-MM-DD H:mm:ss") < moment().format("YYYY-MM-DD H:mm:ss"))) {
      UserOtp.destroy({ where: { userId: user.id } })
      throw new NotAcceptableException('Otp expired!');
    }
    if (user.userOtp.otp !== reqData.otp) {
      throw new NotAcceptableException('Otp does not match!');
    }
    // UserOtp.destroy({ where: { userId: user.id } })
    return user

  }
}