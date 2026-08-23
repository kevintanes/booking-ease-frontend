import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatCurrency";
import { getServiceById, getSlots } from "@/services/serviceService";
import type { Service } from "@/types/service";
import type { TimeSlot } from "@/types/timeSlot";
import { useQuery } from "@tanstack/react-query";
import { addMonths, format, subMonths } from "date-fns";
import {
  ArrowLeft,
  Calendar as CalendarICon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const HeroSection = () => {
  const { id } = useParams();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [calMonth, setCalMonth] = useState<Date>(new Date());
  const [notes, setNotes] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["service", id],
    queryFn: () => getServiceById(id as string),
    enabled: Boolean(id),
  });

  const service: Service | undefined = data?.data;

  const { data: slotsData, isLoading: isSlotsLoading } = useQuery({
    queryKey: [
      "slots",
      id,
      selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
    ],
    queryFn: () =>
      getSlots(id as string, format(selectedDate as Date, "yyyy-MM-dd")),
    enabled: Boolean(id) && Boolean(selectedDate),
  });

  const slots: TimeSlot[] = slotsData?.data || [];

  if (isLoading) {
    return (
      <div className="text-center py-32">
        <p className="text-surface-800">Loading...</p>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="text-center py-32">
        <p className="text-surface-800">Service not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="ghost"
        render={<Link to={`/services/${id}`} />}
        nativeButton={false}
        className="gap-2 h-fit font-medium text-surface-900 hover:text-surface-800 mb-6"
      >
        <ArrowLeft className="size-3.5" /> Back to service
      </Button>

      <h1 className="text-2xl font-bold text-surface-900 mb-1">
        {service?.name}
      </h1>
      <p className="text-surface-800 text-sm mb-8">
        {formatCurrency(service?.price)} - {service?.duration} minutes
      </p>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg: col-span-3 space-y-5">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-surface-900 flex items-center gap-2">
                <CalendarICon className="size-4 text-brand-600" /> Select a Date
              </h2>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCalMonth((prev) => subMonths(prev, 1))}
                  className="p-1.5 rounded-lg hover:bg-surface-100 transition-colors text-surface-900 hover:text-surface-900"
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="text-sm font-semibold text-surface-800 w-32 text-center">
                  {format(calMonth, "MMMM yyyy")}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCalMonth((prev) => addMonths(prev, 1))}
                  className="p-1.5 rounded-lg hover:bg-surface-100 transition-colors text-surface-900 hover:text-surface-900"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>

            <Calendar
              mode="single"
              month={calMonth}
              onMonthChange={setCalMonth}
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setSelectedSlot(null);
              }}
              disabled={{ before: new Date() }}
              showOutsideDays={false}
              className="w-full"
              classNames={{
                nav: "hidden",
                month_caption: "hidden",
                today: "",
                disabled: "cursor-not-allowed",
                day_button:
                  "hover:bg-brand-50 text-surface-800 hover:text-brand-700 cursor-pointer",
              }}
            />
          </Card>

          {selectedDate && (
            <Card className="p-5">
              <h1 className="font-semibold text-surface-900 mb-2">
                Available Times - Wed, Aug 26
              </h1>
              {isSlotsLoading ? (
                <div className="text-center py-6 text-surface-400 text-sm">
                  Loading times...
                </div>
              ) : slots.length === 0 ? (
                <div className="text-center py-6 text-surface-400 text-sm">
                  No time slots available for this date.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {slots.map((slot) => (
                    <Button
                      key={slot.id}
                      disabled={!slot.available}
                      onClick={() => setSelectedSlot(slot)}
                      variant="secondary"
                      size="lg"
                      className={`font-medium rounded-lg shadow-none cursor-pointer 
                      ${
                        !slot.available
                          ? "cursor-not-allowed line-through"
                          : selectedSlot?.id === slot.id
                            ? "border-brand-600 bg-brand-600 text-white shadow-sm hover:bg-brand-600 hover:text-white"
                            : "hover:border-brand-400 hover:text-brand-700 hover:bg-white"
                      } `}
                    >
                      {slot.startTime}
                    </Button>
                  ))}
                </div>
              )}
            </Card>
          )}

          {selectedSlot && (
            <Card className="p-5">
              <FieldLabel
                htmlFor="notes"
                className="font-semibold text-surface-900 mb-2"
              >
                Special requests (optional)
              </FieldLabel>
              <Textarea
                id="notes"
                placeholder="Special requests (optional)"
                className="resize-none"
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
