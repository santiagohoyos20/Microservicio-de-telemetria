import { Module } from '@nestjs/common';
import { TelemetryController } from '../controllers/telemetry.controller';
import { TelemetryService } from '../../services/telemetry.service';
import { VehicleHistory, VehicleHistorySchema } from '../../infrastructure/vehicle-history.schema';
import { VehiclePosition, VehiclePositionSchema } from '../../infrastructure/vehicle-positions.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [TelemetryController],
  providers: [TelemetryService],
  imports: [
    MongooseModule.forFeature([
      { name: VehicleHistory.name, schema: VehicleHistorySchema },
      { name: VehiclePosition.name, schema: VehiclePositionSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class TelemetryModule {}
