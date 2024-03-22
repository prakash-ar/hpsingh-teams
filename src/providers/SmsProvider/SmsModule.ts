import { Global, Module } from '@nestjs/common';
import { SmsService } from './SmsService';


@Global()
@Module({
  imports: [],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule { }
