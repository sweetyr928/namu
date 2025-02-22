import styled from 'styled-components';
import Swal from 'sweetalert2';
import GoogleIcon from '@mui/icons-material/Google';
import { ForestRounded, LogoutRounded } from '@mui/icons-material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { profiles } from '../../profiles';
import { auth, db } from '../../firebase';
import { userData, isLoginState, currentBadge } from '../../Recoil/atoms';
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
  cursor: pointer;

  div {
    font-weight: 800;
  }
`;

const MyPageButton = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.section`
  margin: 0px 10px 0px 0px;
`;

const UserIconWrapper = styled.section`
  border: 3px solid #3f3f3f;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 5px;
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
  const selectedBadge = useRecoilValue(currentBadge);
  const setIsLoginState = useSetRecoilState(isLoginState);
  const setUserData = useSetRecoilState(userData);
  const setSelectedBadge = useSetRecoilState(currentBadge);
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToMyPage = () => {
    navigate('/mypage');
  };

  const userFunc = async () => {
    const sessionData = sessionUserData();
    if (sessionData) {
      setIsLoginState(true);
      const docRef = doc(db, 'users', sessionData.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        addUser(docRef, sessionData).then(() =>
          setUserData({
            uuid: sessionData.uid,
            name: sessionData.displayName,
            email: sessionData.email,
            userPosts: [],
            userTags: [],
            userRequests: [],
            userChatrooms: [],
            receivedRequests: [],
            userBadges: ['나무 심기'],
            currentBadge: '나무 심기',
            userLevel: 0,
            userPoint: 0
          })
        );
        setSelectedBadge('나무 심기');
      } else {
        setUserData(docSnap.data());
        setSelectedBadge(docSnap.data().currentBadge);
      }
    }
  };

  useEffect(() => {}, [selectedBadge]);

  useEffect(() => {
    userFunc();
  }, []);

  const handleGoogleLogout = async () => {
    try {
      const result = await Swal.fire({
        text: '정말 로그아웃 하시겠습니까?',
        showCancelButton: true,
        confirmButtonColor: '#c7d36f',
        cancelButtonColor: '#d33',
        confirmButtonText: '예',
        cancelButtonText: '아니오'
      });

      if (result.isConfirmed) {
        setIsLoginState(false);
        signOut(auth)
          .then(() => {
            sessionStorage.clear();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.error('Error deleting post: ', error);
    }
  };

  return (
    <>
      <HeaderContainer>
        <ElementWrapper onClick={navigateToHome}>
          <IconWrapper>
            <ForestRounded sx={{ fontSize: 50 }} />
          </IconWrapper>
          <LogoDetail>나누고 나눔 받는 무한 지식 품앗이</LogoDetail>
        </ElementWrapper>
        {isLogin ? (
          <ElementWrapper>
            <MyPageButton onClick={navigateToMyPage}>
              <TwoLineText>
                <div>
                  {selectedBadge} {currentUserData.name} 님!
                </div>
                <div>오늘도 좋은 하루 보내세요!</div>
              </TwoLineText>
              <UserIconWrapper>
                {profiles[currentUserData.userLevel]}
              </UserIconWrapper>
            </MyPageButton>
            <LogoutRounded sx={{ fontSize: 45 }} onClick={handleGoogleLogout} />
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
