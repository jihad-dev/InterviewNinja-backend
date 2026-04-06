// rent-car.service.ts
import RentCar from './rent-car.model';
import { IRentCar } from './rent-car.interface';
import AppError from '../../errors/AppError';

const getAllRentCars = async (query: Record<string, unknown>) => {
  const { carType, area, upazila, status, search } = query;

  const filter: Record<string, unknown> = { isDeleted: false };

  if (carType) filter.carType = carType;
  if (area)    filter.area    = area;
  if (upazila) filter.upazila = upazila;
  if (status)  filter.status  = status;

  if (search) {
    filter.$or = [
      { ownerName:  { $regex: search, $options: 'i' } },
      { driverName: { $regex: search, $options: 'i' } },
      { carModel:   { $regex: search, $options: 'i' } },
      { carNumber:  { $regex: search, $options: 'i' } },
      { area:       { $regex: search, $options: 'i' } },
      { upazila:    { $regex: search, $options: 'i' } },
    ];
  }

  return await RentCar.find(filter).sort({ createdAt: -1 });
};

const getSingleRentCar = async (id: string) => {
  const result = await RentCar.findOne({ _id: id, isDeleted: false });
  if (!result) throw new AppError(404, 'তথ্য পাওয়া যায়নি।');
  return result;
};

const createRentCar = async (payload: IRentCar) => {
  return await RentCar.create(payload);
};

const updateRentCar = async (id: string, payload: Partial<IRentCar>) => {
  const result = await RentCar.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new AppError(404, 'তথ্য পাওয়া যায়নি।');
  return result;
};

// ── Status Update (ইউজার করবে) ──
const updateStatus = async (id: string, status: 'available' | 'rented') => {
  const car = await RentCar.findOne({ _id: id, isDeleted: false });
  if (!car) throw new AppError(404, 'তথ্য পাওয়া যায়নি।');

  car.status = status;
  await car.save();

  return {
    status: car.status,
    message: status === 'rented'
      ? 'গাড়িটি ভাড়া হিসেবে চিহ্নিত হয়েছে।'
      : 'গাড়িটি আবার পাওয়া যাচ্ছে।',
  };
};

const deleteRentCar = async (id: string) => {
  const result = await RentCar.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!result) throw new AppError(404, 'তথ্য পাওয়া যায়নি।');
  return result;
};

export const RentCarService = {
  getAllRentCars,
  getSingleRentCar,
  createRentCar,
  updateRentCar,
  updateStatus,
  deleteRentCar,
};