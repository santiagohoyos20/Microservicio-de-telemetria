import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'vehiclepositions',
  timestamps: false,
  versionKey: false,
})
export class VehiclePosition {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  vehicleId: string;

  @Prop({
    default: Date.now,
    index: true,
  })
  lastUpdate: Date;

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

export type VehiclePositionDocument = VehiclePosition & Document;

export const VehiclePositionSchema =
  SchemaFactory.createForClass(VehiclePosition);

// Índice geoespacial
VehiclePositionSchema.index({ location: '2dsphere' });
