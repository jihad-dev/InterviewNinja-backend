// rent-car.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { RentCarService } from './rent-car.service';
import { sendResponse } from '../../utils/sendResponse';

const getAllRentCars = catchAsync(async (req: Request, res: Response) => {
  const result = await RentCarService.getAllRentCars(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'গাড়ির তালিকা পাওয়া গেছে।',
    data: result,
  });
});

const getSingleRentCar = catchAsync(async (req: Request, res: Response) => {
  const result = await RentCarService.getSingleRentCar(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'তথ্য পাওয়া গেছে।',
    data: result,
  });
});

const createRentCar = catchAsync(async (req: Request, res: Response) => {
  const result = await RentCarService.createRentCar(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'গাড়ি সফলভাবে যোগ হয়েছে।',
    data: result,
  });
});

const updateRentCar = catchAsync(async (req: Request, res: Response) => {
  const result = await RentCarService.updateRentCar(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'তথ্য সফলভাবে আপডেট হয়েছে।',
    data: result,
  });
});

const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body;
  const result = await RentCarService.updateStatus(req.params.id, status);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: result,
  });
});

const deleteRentCar = catchAsync(async (req: Request, res: Response) => {
  const result = await RentCarService.deleteRentCar(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'তথ্য সফলভাবে মুছে ফেলা হয়েছে।',
    data: result,
  });
});

export const RentCarController = {
  getAllRentCars,
  getSingleRentCar,
  createRentCar,
  updateRentCar,
  updateStatus,
  deleteRentCar,
};