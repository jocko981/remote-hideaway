import styled from "styled-components";
import { Link } from "react-router-dom";

import CheckoutButton from "./CheckoutButton";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { BREAKPOINTS } from "../../styles/GlobalStyles";

const StyledTodayItem = styled.li`
  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  @media (max-width: ${BREAKPOINTS.xl}) {
    font-size: 1.6rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 1.4rem;
  }
`;

const TodayItemInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
  align-items: center;
`;

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
`;

const Stacked = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const StackedVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Guest = styled.div`
  font-weight: 500;
`;

const Observations = styled.div`
  font-size: 1.2rem;

  @media (max-width: ${BREAKPOINTS.xl}) {
    font-size: 1.4rem;
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numGuests, numNights, observations } = activity;
  const { countryFlag, fullName, nationality } = guests;

  return (
    <StyledTodayItem>
      <TodayItemInfo>
        <StackedVertical>
          <ItemRow>
            {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
            {status === "checked-in" && <Tag type="blue">Departing</Tag>}

            <Stacked>
              <Flag src={countryFlag} alt={`${nationality} flag`} />

              <Guest>{fullName}</Guest>
            </Stacked>
          </ItemRow>

          <div>
            <ItemRow>
              <div>{`${numNights} ${numNights > 1 ? "nights" : "night"}`}</div>

              <div>emailexample.@gmai.com</div>
            </ItemRow>

            <ItemRow>
              <div>{`${numGuests} ${numGuests > 1 ? "guests" : "guest"}`}</div>

              <div>+377 7283 32834</div>
            </ItemRow>
          </div>
        </StackedVertical>

        {status === "unconfirmed" && observations && (
          <Observations>{`Observation: "${observations}"`}</Observations>
        )}

        <ActionsGroup>
          {status === "unconfirmed" && (
            <Button $size="small" $variation="primary" as={Link} to={`/checkin/${id}`}>
              Check-in
            </Button>
          )}
          {status === "checked-in" && <CheckoutButton bookingId={id} />}
        </ActionsGroup>
      </TodayItemInfo>
    </StyledTodayItem>
  );
}

export default TodayItem;
