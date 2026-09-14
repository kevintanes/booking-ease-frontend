import SEO from "@/components/SEO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import type { ServiceFormValues } from "@/lib/validations/service";
import {
  createService,
  deleteService,
  updateService,
  type TimeSlotPayload,
} from "@/services/adminService";
import { getAllService } from "@/services/serviceService";
import type { Service } from "@/types/service";
import HeaderSection from "./sections/headerSection";
import TableSection from "./sections/tableSection";
import ModalService from "./components/ModalService";
import { useSearchParams } from "react-router-dom";

const AdminServicesPage = () => {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [slots, setSlots] = useState<TimeSlotPayload[]>([]);
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useQuery({
    queryKey: ["services-admin", page],
    queryFn: () => getAllService({ page, limit: 10 }),
  });

  const services: Service[] = data?.data?.services || [];
  const pagination = data?.data?.pagination;

  const closeModal = () => {
    setOpenModal(false);
    setSelectedService(null);
    setSlots([]);
  };

  const invalidateServices = () =>
    queryClient.invalidateQueries({ queryKey: ["services-admin"] });

  const createMutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Service created",
      });
      invalidateServices();
      closeModal();
    },
    onError: (error) =>
      toast.add({
        type: "error",
        description: error.message,
      }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<ServiceFormValues>;
    }) => updateService(id, payload),
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Service updated",
      });
      invalidateServices();
      closeModal();
    },
    onError: (error) =>
      toast.add({
        type: "error",
        description: error.message,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteService,

    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Service deactivated",
      });
      invalidateServices();
      closeModal();
    },
    onError: (error) =>
      toast.add({
        type: "error",
        description: error.message,
      }),
  });

  const handleOpenCreate = () => {
    setModalType("create");
    setSelectedService(null);
    setSlots([]);
    setOpenModal(true);
  };

  const handleOpenEdit = (service: Service) => {
    setModalType("edit");
    setSelectedService(service);
    setSlots(service.slots ?? []);
    setOpenModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Deactivate this service?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (
    values: ServiceFormValues & { slots: TimeSlotPayload[] },
  ) => {
    if (modalType === "create") {
      createMutation.mutate(values);
    } else if (selectedService) {
      updateMutation.mutate({ id: selectedService.id, payload: values });
    }
  };

  const handlePageChange = (nextPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(nextPage));
      return next;
    });
  };

  return (
    <>
      <SEO title="Admin Services" description="Admin Services" />
      <HeaderSection onAddService={handleOpenCreate} />
      <TableSection
        services={services}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        pagination={pagination}
      />
      <ModalService
        open={openModal}
        onOpenChange={(open) => (open ? setOpenModal(true) : closeModal())}
        modalType={modalType}
        selectedService={selectedService}
        slots={slots}
        onSlotsChange={setSlots}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </>
  );
};

export default AdminServicesPage;
