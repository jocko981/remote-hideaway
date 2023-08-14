import styled from "styled-components";
import { useCurrentUser } from "./useCurrentUser";
import { BREAKPOINTS } from "../../styles/GlobalStyles";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  font-size: 1.2rem;
  color: var(--color-grey-600);

  & span {
    max-width: 16rem;
    overflow: hidden;
    text-overflow: clip;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    display: none;
  }
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user } = useCurrentUser();
  const { fullName, avatar } = user?.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={fullName ? `Avatar of ${fullName}` : "user-avatar"}
      />
      {fullName && <span>{fullName}</span>}
    </StyledUserAvatar>
  );
}

export default UserAvatar;
