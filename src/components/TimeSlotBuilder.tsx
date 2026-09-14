import type { TimeSlotPayload } from "@/services/adminService";
import { ChevronDown, ChevronUp, Clock, Plus, X } from "lucide-react";
import { useState } from "react";

const DAYS = [
  { value: 1, label: "Monday", short: "Mon" },
  { value: 2, label: "Tuesday", short: "Tue" },
  { value: 3, label: "Wednesday", short: "Wed" },
  { value: 4, label: "Thursday", short: "Thu" },
  { value: 5, label: "Friday", short: "Fri" },
  { value: 6, label: "Saturday", short: "Sat" },
  { value: 0, label: "Sunday", short: "Sun" },
];

const EMPTY_SLOT = {
  dayOfWeek: 1,
  startTime: "08:00",
  endTime: "09:00",
};

interface TimeslotBuilderProps {
  slots: TimeSlotPayload[];
  onChange: (slots: TimeSlotPayload[]) => void;
}

export default function TimeslotBuilder({
  slots,
  onChange,
}: TimeslotBuilderProps) {
  const [expanded, setExpanded] = useState(true);

  const addSlot = () => onChange([...slots, { ...EMPTY_SLOT }]);

  const updateSlot = <K extends keyof TimeSlotPayload>(
    idx: number,
    field: K,
    value: TimeSlotPayload[K],
  ) => {
    const next = slots.map((s, i) =>
      i === idx ? { ...s, [field]: value } : s,
    );
    onChange(next);
  };

  const removeSlot = (idx: number) =>
    onChange(slots.filter((_, i) => i !== idx));

  const slotsByDay = DAYS.reduce<Record<number, TimeSlotPayload[]>>(
    (acc, day) => {
      acc[day.value] = slots.filter((s) => Number(s.dayOfWeek) === day.value);
      return acc;
    },
    {},
  );

  return (
    <div className="border border-surface-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-surface-50 hover:bg-surface-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-brand-500" />
          <span className="text-sm font-semibold text-surface-800">
            Time Slots
          </span>
          {slots.length > 0 && (
            <span className="text-xs bg-brand-100 text-brand-600 rounded-full px-2 py-0.5 font-medium">
              {slots.length} slot{slots.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronUp size={15} className="text-surface-400" />
        ) : (
          <ChevronDown size={15} className="text-surface-400" />
        )}
      </button>

      {expanded && (
        <div className="p-4 space-y-3">
          {slots.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pb-1">
              {DAYS.map((day) => {
                const count = slotsByDay[day.value]?.length || 0;
                return (
                  <span
                    key={day.value}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                      count > 0
                        ? "bg-brand-50 text-brand-600 border border-brand-200"
                        : "bg-surface-100 text-surface-400 border border-surface-200"
                    }`}
                  >
                    {day.short}
                    {count > 0 ? ` ×${count}` : ""}
                  </span>
                );
              })}
            </div>
          )}

          {slots.length === 0 && (
            <p className="text-xs text-surface-400 text-center py-3">
              No time slots yet. Add slots so customers can book this service.
            </p>
          )}

          <div className="space-y-2">
            {slots.map((slot, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1fr_100px_100px_auto] gap-2 items-center bg-surface-50 rounded-lg px-3 py-2.5 border border-surface-100"
              >
                <select
                  value={slot.dayOfWeek}
                  onChange={(e) =>
                    updateSlot(idx, "dayOfWeek", Number(e.target.value))
                  }
                  className="input text-sm py-1.5"
                >
                  {DAYS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>

                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) => updateSlot(idx, "startTime", e.target.value)}
                  className="input text-sm py-1.5 w-full"
                />

                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) => updateSlot(idx, "endTime", e.target.value)}
                  className="input text-sm py-1.5 w-full"
                />

                <button
                  type="button"
                  onClick={() => removeSlot(idx)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-surface-300 hover:text-red-400 transition-colors shrink-0"
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>

          {slots.length > 0 && (
            <div className="grid grid-cols-[1fr_100px_100px_auto] gap-2 px-3">
              <span className="text-xs text-surface-400">Day</span>
              <span className="text-xs text-surface-400">Start</span>
              <span className="text-xs text-surface-400">End</span>
              <span />
            </div>
          )}

          <button
            type="button"
            onClick={addSlot}
            className="w-full flex items-center justify-center gap-1.5 text-xs text-brand-600 
            hover:text-brand-700 border border-dashed border-brand-200 hover:border-brand-400 rounded-lg py-2 
            transition-colors font-medium"
          >
            <Plus size={13} /> Add Time Slot
          </button>
        </div>
      )}
    </div>
  );
}
