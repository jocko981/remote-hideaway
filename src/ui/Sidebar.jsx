import { css, styled } from "styled-components";
// ui
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
import { BREAKPOINTS } from "../styles/GlobalStyles";
import { useSidebarMenuContext } from "../context/SidebarMenuContext";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 1.2rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  overflow-y: auto;

  @media (max-width: ${BREAKPOINTS.md}) {
    position: fixed;
    top: 0;
    left: 0;
    width: 72vw;
    height: 100dvh;
    transition: all 0.3s ease-in-out;
    transform: translateX(-100%);
    z-index: 100;

    ${(props) =>
      props.$isMenuOpen &&
      css`
        transform: translateX(0);
        box-shadow: var(--shadow-lg);
      `}

    padding: 4.8rem 2.4rem;
  }
`;

const SidebarOverlay = styled.div`
  display: none;
  position: fixed;

  @media (max-width: ${BREAKPOINTS.md}) {
    ${(props) =>
      props.$isMenuOpen &&
      css`
        display: block;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(2px);
        z-index: 50;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
      `}
  }
`;

function Sidebar() {
  const { isMenuOpen, closeOpenMenu } = useSidebarMenuContext();

  return (
    <>
      <StyledSidebar $isMenuOpen={isMenuOpen}>
        <Logo />
        <MainNav />

        <Uploader />
      </StyledSidebar>

      <SidebarOverlay $isMenuOpen={isMenuOpen} onClick={closeOpenMenu} />
    </>
  );
}

export default Sidebar;
