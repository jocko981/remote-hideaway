import { styled } from "styled-components";
import { BREAKPOINTS } from "../styles/GlobalStyles";

// Style for form row with password input + toggle button
const StyledFormRowPassword = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1.2fr 0.8fr;
  gap: 2rem;

  @media (max-width: ${BREAKPOINTS.lg}) {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  > input {
    flex-grow: 1;
  }

  > button {
    position: absolute;
    right: 2px;
  }
`;

// Style for form row
const FormRowContainer = styled.div`
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0.4rem;
  }

  &:last-child {
    padding-bottom: 0.4rem;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledFormRow = styled(StyledFormRowPassword)`
  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
  line-height: 3rem;
`;

const Error = styled.span`
  font-size: 1.2rem;
  color: var(--color-red-700);
`;

// Style for vertical form row
const StyledFormRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.8rem 0;

  &:first-child {
    padding-top: 0.4rem;
  }

  &:last-child {
    padding-top: 2.4rem;
    padding-bottom: 0.4rem;
  }
`;

function FormRow({ label, error, children }) {
  return (
    <FormRowContainer>
      <StyledFormRow>
        {label && <Label htmlFor={children.props.id}>{label}</Label>}
        {children}
        {error && <Error>{error}</Error>}
      </StyledFormRow>
    </FormRowContainer>
  );
}

export default FormRow;

export function FormRowPasswordToggle({ id, label, error, children }) {
  return (
    <FormRowContainer>
      <StyledFormRowPassword>
        {label && <Label htmlFor={id}>{label}</Label>}
        <InputContainer>{children}</InputContainer>
        {error && <Error>{error}</Error>}
      </StyledFormRowPassword>
    </FormRowContainer>
  );
}

export function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormRowVertical>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRowVertical>
  );
}

export function FormRowVerticalPasswordToggle({ id, label, error, children }) {
  return (
    <StyledFormRowVertical>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputContainer>{children}</InputContainer>
      {error && <Error>{error}</Error>}
    </StyledFormRowVertical>
  );
}
