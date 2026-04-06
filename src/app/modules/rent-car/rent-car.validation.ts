// rent-car.validation.ts
import { z } from 'zod';

const createRentCarSchema = z.object({
  body: z.object({
    ownerName:  z.string({ required_error: 'মালিকের নাম দিন' }).min(1),
    driverName: z.string().optional(),
    carType: z.enum(
      ['microbus', 'car', 'jeep', 'pickup', 'truck', 'bus', 'cng', 'auto'],
      { required_error: 'গাড়ির ধরন দিন' }
    ),
    carModel:    z.string().optional(),
    carNumber:   z.string().optional(),
    rentPerDay:  z.number().optional(),
    rentPerTrip: z.number().optional(),
    area:        z.string({ required_error: 'এলাকা দিন' }).min(1),
    upazila:     z.string({ required_error: 'উপজেলা দিন' }).min(1),
    phone:       z.array(z.string()).min(1, 'কমপক্ষে একটি নম্বর দিন'),
    status:      z.enum(['available', 'rented', 'maintenance']).optional(),
  }),
});

const updateRentCarSchema = z.object({
  body: z.object({
    ownerName:   z.string().min(1).optional(),
    driverName:  z.string().optional(),
    carType:     z.enum(['microbus', 'car', 'jeep', 'pickup', 'truck', 'bus', 'cng', 'auto']).optional(),
    carModel:    z.string().optional(),
    carNumber:   z.string().optional(),
    rentPerDay:  z.number().optional(),
    rentPerTrip: z.number().optional(),
    area:        z.string().min(1).optional(),
    upazila:     z.string().min(1).optional(),
    phone:       z.array(z.string()).optional(),
    status:      z.enum(['available', 'rented', 'maintenance']).optional(),
  }),
});

export const RentCarValidation = {
  createRentCarSchema,
  updateRentCarSchema,
};