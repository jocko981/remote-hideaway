import styled from "styled-components";
import { BREAKPOINTS } from "../styles/GlobalStyles";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  flex-grow: 1;

  @media (max-width: ${BREAKPOINTS.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
  }
`;

export default TableOperations;
