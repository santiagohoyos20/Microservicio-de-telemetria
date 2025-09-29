import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'vehiclehistories',
  timestamps: false,
  versionKey: false,
})
export class VehicleHistory {
  @Prop({
    required: true,
    index: true,
  })
  vehicleId: string;

  @Prop({
    default: Date.now,
    index: true,
  })
  timestamp: Date;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    _id: false,
  })
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export type VehicleHistoryDocument = VehicleHistory & Document;

export const VehicleHistorySchema =
  SchemaFactory.createForClass(VehicleHistory);

// Índice geoespacial
VehicleHistorySchema.index({ location: '2dsphere' });
