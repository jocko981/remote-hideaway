import { styled } from "styled-components";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-greey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedPublicRoute({ children }) {
  const { isLoading, isAuthenticated } = useCurrentUser();

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return isAuthenticated ? <Navigate to="/" /> : children;
}

export default ProtectedPublicRoute;
