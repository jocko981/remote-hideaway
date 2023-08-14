import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useUpdateCurrentUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCurrentUser } = useMutation({
    mutationFn: updateCurrentUserApi,

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data?.user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("Account updated successfully!");
    },

    onError: (err) => {
      toast.error(err?.message);
    },
  });

  return { isUpdating, updateCurrentUser };
}
