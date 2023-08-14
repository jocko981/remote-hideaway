import { styled } from "styled-components";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-greey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // Load auth user
  const { isLoading, error, user, isAuthenticated } = useCurrentUser();

  // Redirect to /login if no auth user
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // If theres user render App
  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
