// rent-car.validation.ts
import { z } from 'zod';

const carTypeEnum = z.enum([
  'microbus', 'car', 'jeep', 'pickup',
  'truck', 'bus', 'cng', 'auto',
  'hiace', 'noah', 'ambulance',
]);

const createRentCarSchema = z.object({
  body: z.object({
    serviceName: z.string({ required_error: 'সার্ভিসের নাম দিন' }).min(1),
    proprietorName: z.string({ required_error: 'প্রোপাইটরের নাম দিন' }).min(1),
    description: z.string({ required_error: 'বিবরণ দিন' }).min(1),
    carTypes: z.array(carTypeEnum).min(1, 'কমপক্ষে একটি গাড়ির ধরন দিন'),
    serviceArea: z.string({ required_error: 'সার্ভিস এলাকা দিন' }).min(1),
    area: z.string({ required_error: 'এলাকা দিন' }).min(1),
    upazila: z.string({ required_error: 'উপজেলা দিন' }).min(1),
    phone: z.array(z.string()).min(1, 'কমপক্ষে একটি নম্বর দিন'),
    whatsapp: z.string().optional(),
    rentPerDay: z.number().optional(),
    rentPerTrip: z.number().optional(),
    status: z.enum(['available', 'rented', 'maintenance']).optional(),
  }),
});

const updateRentCarSchema = z.object({
  body: z.object({
    serviceName: z.string().min(1).optional(),
    proprietorName: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    carTypes: z.array(carTypeEnum).optional(),
    serviceArea: z.string().min(1).optional(),
    area: z.string().min(1).optional(),
    upazila: z.string().min(1).optional(),
    phone: z.array(z.string()).optional(),
    whatsapp: z.string().optional(),
    rentPerDay: z.number().optional(),
    rentPerTrip: z.number().optional(),
    status: z.enum(['available', 'rented', 'maintenance']).optional(),
  }),
});

export const RentCarValidation = {
  createRentCarSchema,
  updateRentCarSchema,
};