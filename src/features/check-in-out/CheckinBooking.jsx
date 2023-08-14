import styled from "styled-components";
import { useEffect, useState } from "react";

import { formatCurrency } from "../../utils/helpers";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingDetails } from "../bookings/useBookingDetails";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
// ui
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmAction from "../../ui/ConfirmAction";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { isLoading, error, bookingDetails } = useBookingDetails();
  const { isLoading: isLoadingSettings, settingsData } = useSettings();

  useEffect(() => {
    setConfirmPaid(bookingDetails?.isPaid ?? false);
  }, [bookingDetails?.isPaid]);

  const moveBack = useMoveBack();
  const { isCheckingIn, checkin } = useCheckin();

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (error) return <p>{error?.message || "Not found"}</p>;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    status,
  } = bookingDetails;
  const optionalBreakfastPrice = settingsData.breakfastPrice * numNights * numGuests;

  function handleCheckin(onConfirmOptions) {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin(
        {
          bookingId,
          breakfast: {
            hasBreakfast: true,
            extrasPrice: optionalBreakfastPrice,
            totalPrice: totalPrice + optionalBreakfastPrice,
          },
        },
        onConfirmOptions
      );
    } else {
      checkin({ bookingId, breakfast: {} }, onConfirmOptions);
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in: booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={bookingDetails} />

      {status === "unconfirmed" && !hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          I confirm that {guests?.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                Number(totalPrice) + Number(optionalBreakfastPrice)
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Modal>
            <Modal.Open opens="check-in-booking">
              <Button disabled={!confirmPaid || isCheckingIn}>Check in booking #{bookingId}</Button>
            </Modal.Open>

            <Modal.Window name="check-in-booking" isRequesting={isCheckingIn}>
              <ConfirmAction
                actionText={`check-in booking #${bookingId}`}
                disabled={!confirmPaid || isCheckingIn}
                onConfirm={handleCheckin}
              />
            </Modal.Window>
          </Modal>
        )}
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
