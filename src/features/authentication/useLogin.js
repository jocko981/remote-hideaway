import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data?.user);
      navigate("/dashboard", { replace: true });
      toast.success(`Welcome ${data?.user?.email ? data?.user?.email : ""}`);
    },

    onError: (err) => {
      console.log("login err: ", err);
      toast.error(err?.message);
    },
  });

  return { isLoading, login };
}
