import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiArrowUpOnSquare } from "react-icons/hi2";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingDetails } from "./useBookingDetails";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

import BookingDataBox from "./BookingDataBox";
// ui
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ConfirmAction from "../../ui/ConfirmAction";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, error, bookingDetails } = useBookingDetails();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  if (error) return <p>{error?.message || "Not found"}</p>;

  const { status, id: bookingId } = bookingDetails;

  return (
    <>
      <Heading as="h1">Info: Booking #{bookingId}</Heading>

      <Row type="horizontal">
        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <Row>
        <BookingDataBox booking={bookingDetails} />

        <ButtonGroup>
          <Modal>
            {/* modal opener buttons */}
            <Modal.Open opens="delete-booking">
              <Button $variation="danger" style={{ marginRight: "auto" }} disabled={isDeleting}>
                Delete booking
              </Button>
            </Modal.Open>

            {status === "checked-in" && (
              <Modal.Open opens="check-out-booking">
                <Button disabled={isCheckingOut}>Check-out</Button>
              </Modal.Open>
            )}

            {/* modal windows */}
            <Modal.Window name="delete-booking" isRequesting={isDeleting}>
              <ConfirmDelete
                resourceName={`booking #${bookingId}`}
                disabled={isDeleting}
                onConfirm={() => {
                  deleteBooking(bookingId, { onSuccess: () => navigate("/bookings") });
                }}
              />
            </Modal.Window>

            <Modal.Window name="check-out-booking" isRequesting={isCheckingOut}>
              <ConfirmAction
                actionText={`check-out booking #${bookingId}`}
                disabled={isCheckingOut}
                onConfirm={(onConfirmOptions) => checkout(bookingId, onConfirmOptions)}
              />
            </Modal.Window>
          </Modal>

          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Go to Check-in</Button>
          )}

          <Button $variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </Row>
    </>
  );
}

export default BookingDetail;
