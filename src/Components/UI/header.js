import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ForestRounded, ParkRounded, LogoutRounded } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';

const HeaderContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #c7d36f;
  color: #3f3f3f;
  padding: 10px;
`;

const ElementWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    font-weight: 800;
  }
`;

const IconWrapper = styled.div`
  margin: 0px 10px 0px 0px;
`;

const LogoDetail = styled.div`
  font-size: 13px;
  margin: 15px 0px 0px 0px;
`;

const OneLineText = styled.div`
  margin: 0px 10px 0px 0px;
  font-size: 17px;
`;

const TwoLineText = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 10px 0px 0px;
  font-size: 15px;
`;

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(false);
  }, [isLogin]);

  return (
    <>
      <HeaderContainer>
        <ElementWrapper>
          <IconWrapper>
            <ForestRounded sx={{ fontSize: 40 }} />
          </IconWrapper>
          <LogoDetail>나누고 나눔 받는 무한 지식 품앗이</LogoDetail>
        </ElementWrapper>
        {isLogin ? (
          <ElementWrapper>
            <TwoLineText>
              <div>나는야 고수 예린 님!</div>
              <div>오늘도 좋은 하루 보내세요!</div>
            </TwoLineText>
            <IconWrapper>
              <ParkRounded sx={{ fontSize: 30 }} />
            </IconWrapper>
            <LogoutRounded sx={{ fontSize: 30 }} />
          </ElementWrapper>
        ) : (
          <ElementWrapper>
            <OneLineText>나무와 함께 하시겠어요?</OneLineText>
            <GoogleIcon sx={{ fontSize: 30 }} />
          </ElementWrapper>
        )}
      </HeaderContainer>
    </>
  );
};

export default Header;
