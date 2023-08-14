import { useForm } from "react-hook-form";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { useSignup } from "./useSignup";
import usePasswordVisibility from "../../hooks/usePasswordVisibility";
// ui
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow, { FormRowPasswordToggle } from "../../ui/FormRow";
import Input from "../../ui/Input";
import ButtonIcon from "../../ui/ButtonIcon";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = usePasswordVisibility();
  const { isLoading, signup } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    // this f is called on every submit, and each time validation happends
    const { fullName, email, password } = data;

    signup(
      { fullName, email, password },
      {
        onSuccess: reset,
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", {
            required: "Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "Field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Enter a valid email please",
            },
          })}
        />
      </FormRow>

      <FormRowPasswordToggle
        id="password"
        label="Password (min 6 characters)"
        error={errors?.password?.message}
      >
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          disabled={isLoading}
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
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type={showConfirmPassword ? "text" : "password"}
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "Field is required",
            validate: (val) => {
              return val === getValues()?.password || "Passwords need to match";
            },
          })}
        />
        <ButtonIcon type="button" onClick={toggleConfirmPasswordVisibility}>
          {showConfirmPassword ? <HiEyeSlash /> : <HiEye />}
        </ButtonIcon>
      </FormRowPasswordToggle>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" disabled={isLoading} onClick={reset}>
          Reset/Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
