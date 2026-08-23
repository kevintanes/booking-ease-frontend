export interface TimeSlot {
  id: string;
  serviceId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  maxBookings: number;
  isActive: boolean;
  bookedCount: number;
  available: boolean;
}
