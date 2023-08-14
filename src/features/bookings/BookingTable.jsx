import { useBookings } from "./useBookings";
import BookingRow from "./BookingRow";
// ui
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { isLoading, bookingsData, error, count } = useBookings();

  if (isLoading) return <Spinner />;
  if (error) return <p>{error?.message}</p>;
  if (!bookingsData?.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.8fr 1.2fr 1.8fr 0.8fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Stay</div>
          <div>Status</div>
          {/* <div>Status/Amount</div> */}
          {/* <div>Amount</div> */}
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookingsData}
          render={(booking) => <BookingRow key={booking.id} booking={booking} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
