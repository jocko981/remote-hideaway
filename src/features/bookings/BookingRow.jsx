import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { format, isToday } from "date-fns";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";

import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
// ui
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ConfirmAction from "../../ui/ConfirmAction";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  word-break: break-word;
`;

const JustStacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span {
    word-break: break-word;
  }

  & span:first-child {
    font-weight: 500;
    text-transform: capitalize;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  padding-left: 0.4rem;
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigate = useNavigate();
  const { isCheckingOut, checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
        <span>+355 261 566 78</span>
      </Stacked>

      <Stacked>
        <span>{isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)}</span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
        <span>
          &rarr; {numNights} night stay {`(${numGuests} ${numGuests > 1 ? "guests" : "guest"})`}
        </span>
      </Stacked>

      <JustStacked>
        <Tag type={statusToTagName[status]}>{status}</Tag>

        <Amount>{formatCurrency(totalPrice)}</Amount>
      </JustStacked>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />

          <Menus.List id={bookingId}>
            <Menus.Button icon={<HiEye />} onClick={() => navigate(`/bookings/${bookingId}`)}>
              Details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check-in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Modal.Open opens="check-out-booking">
                <Menus.Button icon={<HiArrowUpOnSquare />}>Check-out</Menus.Button>
              </Modal.Open>
            )}

            <Modal.Open opens="delete-booking">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="check-out-booking" isRequesting={isCheckingOut}>
          <ConfirmAction
            actionText={`check-out booking #${bookingId}`}
            disabled={isCheckingOut}
            onConfirm={(onConfirmOptions) => checkout(bookingId, onConfirmOptions)}
          />
        </Modal.Window>

        <Modal.Window name="delete-booking" isRequesting={isDeleting}>
          <ConfirmDelete
            resourceName={`booking #${bookingId}`}
            disabled={isDeleting}
            onConfirm={() => {
              deleteBooking(bookingId);
            }}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
