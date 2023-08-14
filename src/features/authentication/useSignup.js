import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,

    onSuccess: (data) => {
      console.log("new user:", data);
      toast.success(`Successfully added new account!`);
      toast.success(`Please verify the new account from email address.`);
    },

    onError: (err) => {
      toast.error(`${err?.message}`);
    },
  });

  return { isLoading, signup };
}
