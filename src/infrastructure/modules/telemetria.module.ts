import { Module } from '@nestjs/common';
import { TelemetriaService } from '../../application/services/telemetria.service';
import { TelemetriaController } from './telemetria.controller';

@Module({
  providers: [TelemetriaService],
  controllers: [TelemetriaController]
})
export class TelemetriaModule {}
