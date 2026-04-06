// rent-car.model.ts
import { Schema, model } from 'mongoose';
import { IRentCar } from './rent-car.interface';

const rentCarSchema = new Schema<IRentCar>(
  {
    ownerName:  { type: String, required: true },
    driverName: { type: String },
    carType: {
      type: String,
      enum: ['microbus', 'car', 'jeep', 'pickup', 'truck', 'bus', 'cng', 'auto'],
      required: true,
    },
    carModel:    { type: String },
    carNumber:   { type: String },
    rentPerDay:  { type: Number },
    rentPerTrip: { type: Number },
    area:        { type: String, required: true },
    upazila:     { type: String, required: true },
    phone:       [{ type: String, required: true }],
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