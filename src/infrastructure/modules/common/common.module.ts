import { Module } from '@nestjs/common';
import { HttpResponseModule } from '../../../domain/modules/common';
import { LoggerModule } from '../../../domain/modules/common';

@Module({
  imports: [HttpResponseModule, LoggerModule],
  exports: [HttpResponseModule, LoggerModule],
})
export class CommonModule {}
