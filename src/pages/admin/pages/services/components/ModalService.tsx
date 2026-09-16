import TimeslotBuilder from "@/components/TimeSlotBuilder";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  serviceSchema,
  type ServiceFormValues,
} from "@/lib/validations/service";
import type { TimeSlotPayload } from "@/services/adminService";
import { getAllCategories } from "@/services/categoryService";
import type { Category } from "@/types/category";
import type { Service } from "@/types/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

interface ModalServiceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modalType: "create" | "edit";
  selectedService?: Service | null;
  slots: TimeSlotPayload[];
  onSlotsChange: (slots: TimeSlotPayload[]) => void;
  onSubmit: (values: ServiceFormValues & { slots: TimeSlotPayload[] }) => void;
  isSubmitting?: boolean;
}

const EMPTY_VALUES: ServiceFormValues = {
  name: "",
  description: "",
  price: 0,
  duration: 0,
  location: "",
  categoryId: "",
};

const ModalService = ({
  open,
  onOpenChange,
  modalType,
  selectedService,
  slots,
  onSlotsChange,
  onSubmit,
  isSubmitting,
}: ModalServiceProps) => {
  const { control, handleSubmit } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    values:
      modalType === "edit" && selectedService
        ? {
            name: selectedService.name,
            description: selectedService.description ?? "",
            price: Number(selectedService.price),
            duration: selectedService.duration,
            location: selectedService.location ?? "",
            categoryId: selectedService.categoryId,
          }
        : EMPTY_VALUES,
  });

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  const categories: Category[] = categoryData?.data || [];

  const submitForm = handleSubmit((values) => {
    return onSubmit({ ...values, slots });
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 min-w-lg">
        <DialogHeader>
          <DialogTitle className="font-bold text-surface-900">
            {modalType === "create" ? "Add New Service" : "Edit Service"}
          </DialogTitle>
        </DialogHeader>
        <div className="border-t border-surface-100" />
        <form onSubmit={submitForm} className="max-h-[70vh] overflow-y-auto">
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="name"
                    className="text-sm font-medium text-surface-800"
                  >
                    Service Name *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    placeholder="e.g. Padel Court A"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="description"
                    className="text-sm font-medium text-surface-800"
                  >
                    Description *
                  </FieldLabel>
                  <Textarea
                    {...field}
                    rows={3}
                    id="description"
                    placeholder="Describe the service..."
                    aria-invalid={fieldState.invalid}
                    className="resize-none"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="flex gap-3">
              <Controller
                name="price"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="price"
                      className="text-sm font-medium text-surface-800"
                    >
                      Price (IDR) *
                    </FieldLabel>
                    <Input
                      {...field}
                      id="price"
                      type="number"
                      placeholder="150000"
                      min={0}
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="duration"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="duration"
                      className="text-sm font-medium text-surface-800"
                    >
                      Duration (min) *
                    </FieldLabel>
                    <Input
                      {...field}
                      id="duration"
                      type="number"
                      placeholder="60"
                      min={1}
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="location"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="location"
                    className="text-sm font-medium text-surface-800"
                  >
                    Location
                  </FieldLabel>
                  <Input
                    {...field}
                    id="location"
                    type="text"
                    placeholder="e.g. Jakarta Selatan"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="categoryId"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="category"
                    className="text-sm font-medium text-surface-800"
                  >
                    Category *
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="category"
                      aria-invalid={fieldState.invalid}
                      className="data-placeholder:text-surface-400"
                    >
                      <SelectValue placeholder="Select category">
                        {(value: string) => {
                          const selected = categories.find(
                            (c) => c.id === value,
                          );
                          return selected
                            ? `${selected.icon} ${selected.name}`
                            : null;
                        }}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      <SelectGroup>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.icon} {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <TimeslotBuilder slots={slots} onChange={onSlotsChange} />

            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                size="xl"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="xl"
                className="flex-1 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                <Check className="size-4" />
                {isSubmitting
                  ? "Saving..."
                  : modalType === "create"
                    ? "Create"
                    : "Edit"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalService;
