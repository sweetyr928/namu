import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Home,
  SearchRounded,
  ModeEditOutlineRounded
} from '@mui/icons-material';

const SideBarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 35%;
  left: calc(1.3%);
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 20px 0px;

  &:hover {
    cursor: pointer;
  }
`;

const getResponsiveFontSize = (baseFontSize) =>
  `calc(${baseFontSize}px + (${baseFontSize} * ((100vw - 320px) / 680)))`;

const CustomIcon = styled(({ color, hoverColor, baseFontSize, ...props }) => (
  <props.component {...props} />
))`
  color: ${({ color }) => color};
  font-size: ${({ baseFontSize }) => getResponsiveFontSize(baseFontSize)};
  transition: color 0.3s;

  &:hover {
    color: ${({ hoverColor }) => hoverColor};
  }
`;

function SideBar() {
  return (
    <SideBarContainer>
      <Link to="/">
        <IconWrapper>
          <CustomIcon
            component={Home}
            color="#3F3F3F"
            hoverColor="#c7d36f"
            baseFontSize={35}
          />
        </IconWrapper>
      </Link>
      <Link to="/search">
        <IconWrapper>
          <CustomIcon
            component={SearchRounded}
            color="#3F3F3F"
            hoverColor="#c7d36f"
            baseFontSize={35}
          />
        </IconWrapper>
      </Link>
      <Link to="/newPost">
        <IconWrapper>
          <CustomIcon
            component={ModeEditOutlineRounded}
            color="#3F3F3F"
            hoverColor="#c7d36f"
            baseFontSize={35}
          />
        </IconWrapper>
      </Link>
    </SideBarContainer>
  );
}

export default SideBar;
