import styled from "styled-components";
import { useDarkModeContext } from "../context/DarkModeContext";
import { Link } from "react-router-dom";
import { BREAKPOINTS } from "../styles/GlobalStyles";
import { useSidebarMenuContext } from "../context/SidebarMenuContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const LogoText = styled.span`
  display: block;
  margin-bottom: 0.4rem;
  letter-spacing: -0.25px;
  font-size: 1.6rem;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;

  @media (max-width: ${BREAKPOINTS.md}) {
    height: 11.2rem;
  }
`;

function Logo() {
  const { closeOpenMenu } = useSidebarMenuContext();
  const { isDarkMode } = useDarkModeContext();
  const logoSrc = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <StyledLogo>
      <Link to="/" aria-label="remote-hideaway" role="link" tabIndex="0" onClick={closeOpenMenu}>
        <LogoText>Remote hideaway</LogoText>
        <Img src={logoSrc} alt="Logo remote-hideaway" />
      </Link>
    </StyledLogo>
  );
}

export default Logo;
