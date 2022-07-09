import { Module } from '@nestjs/common';
import { HttpResponseService } from '../services/common'

@Module({
  providers: [HttpResponseService],
  exports: [HttpResponseService],
})
export class HttpResponseModule {}
