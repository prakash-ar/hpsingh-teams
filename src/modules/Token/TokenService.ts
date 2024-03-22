import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from '@model/TokenModel';
import { TokenCreateDto } from './dto/TokenCreateDto';
import { User } from '@model/UserModel';
import { TokenDto } from './dto/TokenDto';
import { CustomerCreateDto } from '@module/Customer/dto/SaveCustomerDto';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token)
    private tokenModel: typeof Token,
  ) { }

  async findAll(): Promise<Token[]> {
    return this.tokenModel.findAll({ where: { status: true } });
  }

  findOne(token: number): Promise<Token> {
    return this.tokenModel.findOne({
      where: {
        token,
        status: true
      },
    });
  }

  async searchByToken(token: number): Promise<Token[]> {
    return await this.tokenModel.findAll({
      where: {
        token,
        status: true
      }
    });
  }

  async createToken(data: { token: number, status: boolean }): Promise<any> {
    return await this.tokenModel.create({ token: data.token, status: data.status })
  }
  async activateToken(customer: CustomerCreateDto): Promise<any> {
    const exits = await this.tokenModel.findOne({
      where: {
        token: customer.token
      },
    });
    if (exits === null) {
      return await this.tokenModel.create({
        token: customer.token,
        customerId: customer.customerId,
        customerName: customer.name,
        customerPhone: customer.phone,
        status: true,
      })
    } else {
      return await this.tokenModel.update({
        customerId: customer.customerId,
        customerName: customer.name,
        customerPhone: customer.phone,
        status: true,
      }, { where: { token: customer.token } })
    }

  }
}