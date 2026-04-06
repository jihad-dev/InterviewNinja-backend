// rent-car.interface.ts
export type TCarType =
  | 'microbus'
  | 'car'
  | 'jeep'
  | 'pickup'
  | 'truck'
  | 'bus'
  | 'cng'
  | 'auto';

export type TCarStatus = 'available' | 'rented' | 'maintenance';

export interface IRentCar {
  // ── গাড়ির তথ্য ──
  ownerName: string;        // মালিকের নাম
  driverName?: string;      // চালকের নাম
  carType: TCarType;        // গাড়ির ধরন
  carModel?: string;        // গাড়ির মডেল
  carNumber?: string;       // নম্বর প্লেট

  // ── ভাড়ার তথ্য ──
  rentPerDay?: number;      // প্রতিদিন ভাড়া
  rentPerTrip?: number;     // প্রতি ট্রিপ ভাড়া

  // ── লোকেশন ──
  area: string;             // এলাকা
  upazila: string;          // উপজেলা

  // ── যোগাযোগ ──
  phone: string[];

  // ── স্ট্যাটাস ──
  status: TCarStatus;       // available / rented / maintenance

  // ── সিস্টেম ──
  isDeleted: boolean;
}