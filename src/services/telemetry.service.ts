import { Injectable } from '@nestjs/common';
import { VehiclePosition, VehiclePositionDocument } from 'src/infrastructure/vehicle-positions.schema';
import { InjectModel } from '@nestjs/mongoose';
import { VehicleHistory, VehicleHistoryDocument } from 'src/infrastructure/vehicle-history.schema';
import { Model } from 'mongoose';
import { CurrentPositionDto } from 'src/domain/dto/current-position.dto';
import { last } from 'rxjs';

@Injectable()
export class TelemetryService {
    constructor(
        @InjectModel(VehicleHistory.name)
        private historyModel: Model<VehicleHistoryDocument>,

        @InjectModel(VehiclePosition.name)
        private positionModel: Model<VehiclePositionDocument>,
    ) { }

    async registerLocation(vehicleId: string, lng: number, lat: number) {
        // Guardar en histórico
        await this.historyModel.create({
            vehicleId,
            location: { type: 'Point', coordinates: [lng, lat] },
            timestamp: new Date(),
        });

        // Actualizar la última posición
        await this.positionModel.findOneAndUpdate(
            { vehicleId },
            {
                vehicleId,
                location: { type: 'Point', coordinates: [lng, lat] },
                lastUpdate: new Date(),
            },
            { upsert: true, new: true } // Crea el documento si no existe
        );

        return { ok: true, message: 'Ubicación registrada correctamente' };
    }

    async getCurrentPosition(vehicleId: string): Promise<CurrentPositionDto | null> {
    const record = await this.positionModel
      .findOne({ vehicleId })
      .sort({ lastUpdate: -1 }) // última posición
      .exec();

    if (!record) return null;

    return {
      vehicleId: record.vehicleId,
      lng: record.location.coordinates[0],
      lat: record.location.coordinates[1],
      timestamp: record.lastUpdate,
    };
  }
}
