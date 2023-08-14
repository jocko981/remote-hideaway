import { styled } from "styled-components";
import { BiMenu, BiWindowClose } from "react-icons/bi";

import { useSidebarMenuContext } from "../context/SidebarMenuContext";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import ButtonIcon from "./ButtonIcon";
import { BREAKPOINTS } from "../styles/GlobalStyles";
import SearchBooking from "../features/bookings/SearchBooking";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  padding-top: 2rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

const SidebarMenuHamburger = styled.div`
  display: none;
  margin-right: auto;
  cursor: pointer;

  & svg {
    color: var(--color-grey-600);
  }

  @media (max-width: ${BREAKPOINTS.md}) {
    display: inline-block;
  }
`;

function Header() {
  const { isMenuOpen, toggleOpenMenu } = useSidebarMenuContext();

  return (
    <StyledHeader>
      <SidebarMenuHamburger onClick={toggleOpenMenu}>
        <ButtonIcon>{isMenuOpen ? <BiWindowClose /> : <BiMenu />}</ButtonIcon>
      </SidebarMenuHamburger>

      {/* search booking by ID, and navigate to that booking details */}
      <SearchBooking />

      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
