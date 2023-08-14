import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

import { useLogin } from "./useLogin";
import usePasswordVisibility from "../../hooks/usePasswordVisibility";
// ui
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { FormRowVertical, FormRowVerticalPasswordToggle } from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import ButtonIcon from "../../ui/ButtonIcon";

function LoginForm() {
  const [email, setEmail] = useState("test@email.com");
  const [password, setPassword] = useState("test123");
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const { isLoading, login } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login({ email, password });
    // login({ email, password }, {
    //   onSettled: () => {
    //   // add some options here, reset password field if login fails, or whatever
    //   }
    // });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This autoComplete makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVerticalPasswordToggle id="password" label="Password">
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <ButtonIcon type="button" onClick={togglePasswordVisibility}>
          {showPassword ? <HiEyeSlash /> : <HiEye />}
        </ButtonIcon>
      </FormRowVerticalPasswordToggle>
      <FormRowVertical>
        <Button $size="large" disabled={isLoading}>
          {!isLoading ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
