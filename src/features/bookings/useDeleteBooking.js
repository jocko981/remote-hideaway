import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const {
    isLoading: isDeleting,
    error,
    mutate: deleteBooking,
  } = useMutation({
    mutationFn: deleteBookingApi,

    onSuccess: (data, variables) => {
      toast.success(`Successfully deleted booking #${variables}`);

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, error, deleteBooking };
}
