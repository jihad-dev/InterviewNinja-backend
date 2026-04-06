// rent-car.model.ts
import { Schema, model } from 'mongoose';
import { IRentCar } from './rent-car.interface';

const CAR_TYPES = [
  'microbus', 'car', 'jeep', 'pickup',
  'truck', 'bus', 'cng', 'auto',
  'hiace', 'noah', 'ambulance',
];

const rentCarSchema = new Schema<IRentCar>(
  {
    serviceName: { type: String, required: true },
    proprietorName: { type: String, required: true },
    description: { type: String, required: true },
    carTypes: [{ type: String, enum: CAR_TYPES }],
    serviceArea: { type: String, required: true },
    area: { type: String, required: true },
    upazila: { type: String, required: true },
    phone: [{ type: String, required: true }],
    whatsapp: { type: String },
    rentPerDay: { type: Number },
    rentPerTrip: { type: Number },
    status: {
      type: String,
      enum: ['available', 'rented', 'maintenance'],
      default: 'available',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const RentCar = model<IRentCar>('RentCar', rentCarSchema);
export default RentCar;