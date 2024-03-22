import { MyLogger } from "@module/Logger/LoggerService";
import { Global, Injectable } from "@nestjs/common";

@Global()
@Injectable()
export class SmsService {

  constructor() { }

  async sendSms(to: number | string, message: string): Promise<boolean> {
    //  Sms sending login
    const log = new MyLogger()
    log.info(`Sending sms to ${to}`)
    return true
  }
}