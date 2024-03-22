import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Business } from '@model/BusinessModel';
import { BusinessCreateDto } from './dto/BusinessDto';
import { User } from '@model/UserModel';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business)
    private businessModel: typeof Business,
  ) { }

  async findAll(): Promise<Business[]> {
    return this.businessModel.findAll();
  }

  findOne(id: string): Promise<Business> {
    return this.businessModel.findOne({
      where: {
        id,
      },
    });
  }
  async createBusiness(data: BusinessCreateDto): Promise<BusinessCreateDto> {
    return this.businessModel.create({ ...data })
  }
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}