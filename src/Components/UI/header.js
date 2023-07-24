import styled from 'styled-components';
import GoogleIcon from '@mui/icons-material/Google';
import { ForestRounded, ParkRounded, LogoutRounded } from '@mui/icons-material';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { userData, isLoginState } from '../../Recoil/atoms';
import { addUser, handleGoogleLogin } from '../API/Login/fetchUser';

const HeaderContainer = styled.header`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #c7d36f;
  color: #3f3f3f;
  padding: 10px;
`;

const ElementWrapper = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    font-weight: 800;
  }

  .home-link {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #3f3f3f;
  }

  .mypage-link {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #3f3f3f;
  }
`;

const IconWrapper = styled.section`
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

export const sessionUserData = () => {
  for (const key of Object.keys(sessionStorage)) {
    if (key.includes('firebase:authUser:')) {
      return JSON.parse(sessionStorage.getItem(key) || '{}');
    }
  }
};

const Header = () => {
  const isLogin = useRecoilValue(isLoginState);
  const currentUserData = useRecoilValue(userData);
  const setIsLoginState = useSetRecoilState(isLoginState);
  const setUserData = useSetRecoilState(userData);

  const userFunc = async () => {
    const sessionData = sessionUserData();
    if (sessionData) {
      setIsLoginState(true);
      const docRef = doc(db, 'users', sessionData.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        addUser(docRef, sessionData);
      }
      setUserData(docSnap.data());
    }
  };

  useEffect(() => {
    userFunc();
  }, []);

  const handleGoogleLogout = () => {
    const isLogout = window.confirm('로그아웃 하시겠습니까?');

    if (isLogout) {
      setIsLoginState(false);
      signOut(auth).catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <>
      <HeaderContainer>
        <ElementWrapper>
          <a href="/" className="home-link">
            <IconWrapper>
              <ForestRounded sx={{ fontSize: 40 }} />
            </IconWrapper>
            <LogoDetail>나누고 나눔 받는 무한 지식 품앗이</LogoDetail>
          </a>
        </ElementWrapper>
        {isLogin ? (
          <ElementWrapper>
            <a href="/mypage" className="mypage-link">
              <TwoLineText>
                <div>
                  {currentUserData.currentBadge} {currentUserData.name} 님!
                </div>
                <div>오늘도 좋은 하루 보내세요!</div>
              </TwoLineText>
              <IconWrapper>
                <ParkRounded sx={{ fontSize: 30 }} />
              </IconWrapper>
            </a>
            <LogoutRounded sx={{ fontSize: 30 }} onClick={handleGoogleLogout} />
          </ElementWrapper>
        ) : (
          <ElementWrapper>
            <OneLineText>나무와 함께 하시겠어요?</OneLineText>
            <GoogleIcon sx={{ fontSize: 30 }} onClick={handleGoogleLogin} />
          </ElementWrapper>
        )}
      </HeaderContainer>
    </>
  );
};

export default Header;
