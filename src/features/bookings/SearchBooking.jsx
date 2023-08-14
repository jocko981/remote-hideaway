import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { styled } from "styled-components";
// ui
import ButtonIcon from "../../ui/ButtonIcon";
import Input from "../../ui/Input";
import { BiSearch } from "react-icons/bi";

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  position: relative;

  > input {
    width: 21rem;
  }

  > button {
    position: absolute;
    right: 2px;
  }
`;

function SearchBooking() {
  const [bookingId, setBookingId] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (bookingId) navigate(`/bookings/${bookingId}`);
  }

  return (
    <Form onSubmit={handleSearch}>
      <Input
        placeholder="Search booking"
        type="number"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
      />
      <ButtonIcon>
        <BiSearch />
      </ButtonIcon>
    </Form>
  );
}

export default SearchBooking;
