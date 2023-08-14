import styled from "styled-components";
import { useTodayActivity } from "./useTodayActivity";

import DashboardBox from "../dashboard/DashboardBox";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";
import { BREAKPOINTS } from "../../styles/GlobalStyles";

const StyledToday = styled(DashboardBox)`
  grid-column: 1 / span 2;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media (max-width: ${BREAKPOINTS.xl}) {
    grid-column: 1 / -1;
  }
`;

const TodayList = styled.ul`
  overflow-y: auto;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { isLoading, activities } = useTodayActivity();

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
        {!isLoading && activities?.length > 0 && <p>{`${activities?.length} activities`}</p>}
      </Row>

      {!isLoading ? (
        activities?.length > 0 ? (
          <TodayList>
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity?.id} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activities for today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivity;
