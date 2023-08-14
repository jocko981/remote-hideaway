import { useCheckout } from "./useCheckout";

import Button from "../../ui/Button";
import ConfirmAction from "../../ui/ConfirmAction";
import Modal from "../../ui/Modal";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkout } = useCheckout();

  return (
    <Modal>
      <Modal.Open opens="check-out-booking">
        <Button $variation="primary" $size="small" disabled={isCheckingOut}>
          Check-out
        </Button>
      </Modal.Open>

      <Modal.Window name="check-out-booking" isRequesting={isCheckingOut}>
        <ConfirmAction
          actionText={`check-out booking #${bookingId}`}
          disabled={isCheckingOut}
          onConfirm={() => checkout(bookingId)}
        />
      </Modal.Window>
    </Modal>
  );
}

export default CheckoutButton;
