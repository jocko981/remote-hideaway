import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
// ui
import Sidebar from "./Sidebar";
import Header from "./Header";
import { BREAKPOINTS } from "../styles/GlobalStyles";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media (max-width: ${BREAKPOINTS.md}) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: auto;

  /* @media (max-width: ${BREAKPOINTS.xl}) {
    padding: 3.2rem 4rem 4.8rem 3.2rem;
  } */
`;

const Container = styled.div`
  max-width: 110rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  /* gap: 3.2rem; it was like this */
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
