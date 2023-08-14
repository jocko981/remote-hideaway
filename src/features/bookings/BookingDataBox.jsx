import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import { BREAKPOINTS } from "../../styles/GlobalStyles";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }

  @media (max-width: ${BREAKPOINTS.xl}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }

  @media (max-width: ${BREAKPOINTS.lg}) {
    /* padding: 1.2rem 2.4rem; */
    padding: 1.6rem 3.2rem;
    padding: 2rem 3.2rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    padding: 1.6rem 2.4rem;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;

  @media (max-width: ${BREAKPOINTS.lg}) {
    padding: 3.2rem 3.2rem 1.2rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    padding: 3.2rem 2.4rem 1.2rem;
  }
`;

const Guest = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  > div {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    & p.bold {
      font-weight: 500;
      color: var(--color-grey-700);
    }
  }

  @media (max-width: ${BREAKPOINTS.lg}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }
`;

const Price = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.$isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) => (props.$isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)")};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }

  @media (max-width: ${BREAKPOINTS.lg}) {
    padding: 1.6rem 2rem;
    flex-direction: column;
    gap: 0.8rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    > div {
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
    }
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;

  @media (max-width: ${BREAKPOINTS.lg}) {
    padding: 1.6rem 3.2rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    padding: 1.6rem 2.4rem;
  }
`;

// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)}) &mdash;{" "}
          {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          <div>
            {countryFlag && <Flag src={countryFlag} alt={`${country} flag`} />}
            <p className="bold">
              {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
            </p>
          </div>
          <div>
            <p>&bull; {email}</p>
            <p> +382 3374 223 56</p>
          </div>
          <div>
            <p>&bull; National ID {nationalID}</p>
          </div>
        </Guest>

        {observations && (
          <DataItem icon={<HiOutlineChatBubbleBottomCenterText />} label="Observations:">
            <span>{observations}</span>
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          <span>{hasBreakfast ? "Yes" : "No"}</span>
        </DataItem>

        <Price $isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(extrasPrice)} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
