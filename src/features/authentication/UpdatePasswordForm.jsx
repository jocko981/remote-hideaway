import { useForm } from "react-hook-form";

import { useUpdateCurrentUser } from "./useUpdateCurrentUser";
// ui
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow, { FormRowPasswordToggle } from "../../ui/FormRow";
import Input from "../../ui/Input";
import usePasswordVisibility from "../../hooks/usePasswordVisibility";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

function UpdatePasswordForm() {
  const {
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = usePasswordVisibility();
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateCurrentUser, isUpdating } = useUpdateCurrentUser();

  function onSubmit({ password }) {
    updateCurrentUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowPasswordToggle
        id="password"
        label="New password (min 6 characters)"
        error={errors?.password?.message}
      >
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "Field is required",
            minLength: {
              value: 6,
              message: "Must be at least 6 characters long",
            },
          })}
        />
        <ButtonIcon type="button" onClick={togglePasswordVisibility}>
          {showPassword ? <HiEyeSlash /> : <HiEye />}
        </ButtonIcon>
      </FormRowPasswordToggle>

      <FormRowPasswordToggle
        id="passwordConfirm"
        label="Confirm new password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type={showConfirmPassword ? "text" : "password"}
          id="passwordConfirm"
          autoComplete="new-password"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "Field is required",
            validate: (value) => getValues().password === value || "Passwords need to match",
          })}
        />
        <ButtonIcon type="button" onClick={toggleConfirmPasswordVisibility}>
          {showConfirmPassword ? <HiEyeSlash /> : <HiEye />}
        </ButtonIcon>
      </FormRowPasswordToggle>

      <FormRow>
        <Button onClick={reset} type="reset" $variation="secondary">
          Reset/Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
