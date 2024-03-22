
import { Audit } from '@model/AuditModel';
import { Injectable, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectModel(Audit)
    private auditModel: typeof Audit
  ) { }
  async logAction(userId: string, action: string, details: string, module: string): Promise<void> {
    await Audit.create({
      userId,
      action,
      details,
      module
    });

  }
}
