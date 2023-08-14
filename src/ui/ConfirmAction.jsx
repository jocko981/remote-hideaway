import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmAction = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmAction({ actionText, onConfirm, disabled, closeModal }) {
  return (
    <StyledConfirmAction>
      <Heading as="h3">Are you sure?</Heading>
      <p>
        Are you sure you want to: <b>{actionText}</b> ?
      </p>

      <div>
        <Button $variation="secondary" disabled={disabled} onClick={closeModal}>
          Cancel
        </Button>
        <Button disabled={disabled} onClick={() => onConfirm({ onSettled: closeModal })}>
          Yes
        </Button>
      </div>
    </StyledConfirmAction>
  );
}

export default ConfirmAction;
