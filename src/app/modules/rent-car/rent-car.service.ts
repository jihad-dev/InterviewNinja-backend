// rent-car.service.ts
import RentCar from './rent-car.model';
import { IRentCar } from './rent-car.interface';
import AppError from '../../errors/AppError';

const getAllRentCars = async (query: Record<string, unknown>) => {
  const { area, upazila, status, search } = query;
  const filter: Record<string, unknown> = { isDeleted: false };

  if (area)    filter.area    = area;
  if (upazila) filter.upazila = upazila;
  if (status)  filter.status  = status;

  if (search) {
    filter.$or = [
      { serviceName:    { $regex: search, $options: 'i' } },
      { proprietorName: { $regex: search, $options: 'i' } },
      { description:    { $regex: search, $options: 'i' } },
      { serviceArea:    { $regex: search, $options: 'i' } },
      { area:           { $regex: search, $options: 'i' } },
      { upazila:        { $regex: search, $options: 'i' } },
    ];
  }

  return await RentCar.find(filter).sort({ createdAt: -1 });
};


const createRentCar = async (payload: IRentCar) => {
  const isExist = await RentCar.findOne({
    serviceName: payload.serviceName,
    isDeleted: false,
  });
  if (isExist) throw new AppError(409, `'${payload.serviceName}' ইতিমধ্যে আছে।`);
  return await RentCar.create(payload);
};

const updateStatus = async (
  id: string,
  status: 'available' | 'rented' | 'maintenance'
) => {
  const car = await RentCar.findOne({ _id: id, isDeleted: false });
  if (!car) throw new AppError(404, 'তথ্য পাওয়া যায়নি।');

  car.status = status;
  await car.save();

  const messages: Record<string, string> = {
    available:   'গাড়িটি আবার পাওয়া যাচ্ছে।',
    rented:      'গাড়িটি ভাড়া হিসেবে চিহ্নিত হয়েছে।',
    maintenance: 'গাড়িটি মেরামতে আছে।',
  };

  return { status: car.status, message: messages[status] };
};

const deleteRentCar = async (id: string) => {
  const result = await RentCar.findByIdAndUpdate(
    id, { isDeleted: true }, { new: true }
  );
  if (!result) throw new AppError(404, 'তথ্য পাওয়া যায়নি।');
  return result;
};

export const RentCarService = {
  getAllRentCars,
  createRentCar,
  updateStatus,
  deleteRentCar,
};