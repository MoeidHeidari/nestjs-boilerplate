import { Module } from '@nestjs/common';
import { HttpResponseModule } from '../../../core/modules'
import { LoggerModule } from '../../../core/modules'

@Module({
  imports: [HttpResponseModule, LoggerModule],
  exports: [HttpResponseModule, LoggerModule],
})
export class CommonModule {}
