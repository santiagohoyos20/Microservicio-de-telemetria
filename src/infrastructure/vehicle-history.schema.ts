import { Schema, model } from "mongoose";

export const VehicleHistorySchema = new Schema({
  vehicleId: {
    type: String,
    required: true,
    index: true // index para buscar rápido por bus
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true // index para ordenar/filtrar por tiempo
  },
  location: {
    type: {
      type: String,
      enum: ["Point"], // siempre será Point en GeoJSON
      required: true
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  }
});

// Índice geoespacial para consultas de proximidad / rutas
VehicleHistorySchema.index({ location: "2dsphere" });

// Modelo
export const VehicleHistory = model("VehicleHistory", VehicleHistorySchema);

// 🔹 Definición del tipo VehicleHistoryDocument
export type VehicleHistoryDocument = Document & {
  vehicleId: string;
  timestamp: Date;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
};