import styled from 'styled-components';
import {
  Home,
  SearchRounded,
  ModeEditOutlineRounded
} from '@mui/icons-material';

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 40px 200px 20px;
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 30px 0px;

  &:hover {
    cursor: pointer;
  }
`;

const CustomIcon = styled(({ color, hoverColor, ...props }) => (
  <props.component {...props} />
))`
  color: ${({ color }) => color};
  transition: color 0.3s;

  &:hover {
    color: ${({ hoverColor }) => hoverColor};
  }
`;

const SideBar = () => (
  <SideBarContainer>
    <IconWrapper>
      <CustomIcon
        component={Home}
        color="#3F3F3F"
        hoverColor="#9EB23B"
        sx={{ fontSize: 40 }}
      />
    </IconWrapper>
    <IconWrapper>
      <CustomIcon
        component={SearchRounded}
        color="#3F3F3F"
        hoverColor="#9EB23B"
        sx={{ fontSize: 40 }}
      />
    </IconWrapper>
    <IconWrapper>
      <CustomIcon
        component={ModeEditOutlineRounded}
        color="#3F3F3F"
        hoverColor="#9EB23B"
        sx={{ fontSize: 40 }}
      />
    </IconWrapper>
  </SideBarContainer>
);

export default SideBar;
