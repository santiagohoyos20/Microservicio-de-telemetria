import { Injectable } from '@nestjs/common';
import { VehiclePosition, VehiclePositionDocument } from 'src/infrastructure/vehicle-positions.schema';
import { InjectModel } from '@nestjs/mongoose';
import { VehicleHistory, VehicleHistoryDocument } from 'src/infrastructure/vehicle-history.schema';
import { Model } from 'mongoose';

@Injectable()
export class TelemetryService {
    constructor(
        @InjectModel(VehicleHistory.name)
        private historyModel: Model<VehicleHistoryDocument>,

        @InjectModel(VehiclePosition.name)
        private positionModel: Model<VehiclePositionDocument>,
    ) { }

    async registerLocation(vehicleId: string, lng: number, lat: number) {
        // 1️⃣ Guardar en histórico
        await this.historyModel.create({
            vehicleId,
            location: { type: 'Point', coordinates: [lng, lat] },
            timestamp: new Date(),
        });

        // 2️⃣ Actualizar la última posición
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
}
