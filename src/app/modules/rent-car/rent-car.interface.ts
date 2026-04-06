// rent-car.interface.ts
export type TCarType =
  | 'microbus'
  | 'car'
  | 'jeep'
  | 'pickup'
  | 'truck'
  | 'bus'
  | 'cng'
  | 'auto'
  | 'hiace'
  | 'noah'
  | 'ambulance';

export type TCarStatus = 'available' | 'rented' | 'maintenance';

export interface IRentCar {
  // ── সার্ভিসের তথ্য ──
  serviceName: string;       // বাঁশখালী কার এন্ড হাইস রেন্ট সার্ভিস
  proprietorName: string;    // প্রোপাইটর: এনামুল হক
  description: string;       // এখানে এসি নন এসি মাইক্রো...

  // ── গাড়ির ধরন ──
  carTypes: TCarType[];      // ['microbus', 'car', 'hiace', 'noah']

  // ── সার্ভিস এলাকা ──
  serviceArea: string;       // বাঁশখালী থেকে সমগ্র বাংলাদেশ
  area: string;              // এলাকা
  upazila: string;           // উপজেলা

  // ── যোগাযোগ ──
  phone: string[];           // কল করুন
  whatsapp?: string;         // মেসেজ করুন (WhatsApp)

  // ── ভাড়ার তথ্য ──
  rentPerDay?: number;
  rentPerTrip?: number;

  // ── স্ট্যাটাস ──
  status: TCarStatus;

  // ── সিস্টেম ──
  isDeleted: boolean;
}