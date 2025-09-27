import { Module } from '@nestjs/common';
import { TelemetryController } from '../controllers/telemetry.controller';
import { TelemetryService } from '../../services/telemetry.service';

@Module({
  controllers: [TelemetryController],
  providers: [TelemetryService]
})
export class TelemetryModule {}
