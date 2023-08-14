import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const {
    mutate: checkout,
    isLoading: isCheckingOut,
    error,
  } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      // this is data returned from mutation function returned from the function updateBooking
      toast.success(`Booking #${data.id} checked-out successfully`);
      queryClient.invalidateQueries({ active: true });
      // invalidates all queries that are active on the page
    },

    onError: () => {
      toast.error(`There was an error while checking out`);
    },
  });

  return { isCheckingOut, checkout, error };
}
