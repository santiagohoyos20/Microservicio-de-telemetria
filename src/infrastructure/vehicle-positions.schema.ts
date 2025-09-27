import { Schema, model } from "mongoose";

export const VehiclePositionSchema = new Schema({
  vehicleId: {
    type: String,
    required: true,
    unique: true, // cada bus tiene un solo documento
    index: true
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
    index: true
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  }
});

// Índice geoespacial
VehiclePositionSchema.index({ location: "2dsphere" });

export const VehiclePosition = model("VehiclePosition", VehiclePositionSchema);

export type VehiclePositionDocument = Document & {
  vehicleId: string;
  lastUpdate: Date;
  location: { type: 'Point'; coordinates: [number, number] };
};
