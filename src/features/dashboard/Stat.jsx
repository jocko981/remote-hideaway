import styled from "styled-components";

import DashboardBox from "./DashboardBox";
import { BREAKPOINTS } from "../../styles/GlobalStyles";

const StyledStat = styled(DashboardBox)`
  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;

  @media (max-width: ${BREAKPOINTS.xl}) {
    grid-column: span 2;
  }

  @media (max-width: ${BREAKPOINTS.md}) {
    grid-template-columns: 5.6rem 1fr;
    column-gap: 1.2rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    grid-column: 1/-1;
    column-gap: 1.6rem;
    padding: 1.6rem 2.4rem;
  }
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.$color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.$color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  white-space: nowrap;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;

  @media (max-width: ${BREAKPOINTS.md}) {
    font-size: 2.2rem;
  }
`;

function Stat({ icon, title, value, color }) {
  return (
    <StyledStat>
      <Icon $color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
