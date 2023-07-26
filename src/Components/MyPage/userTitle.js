import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery, useMutation } from 'react-query';
import { useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import { WhiteButton } from '../UI/button';
import { userData, currentBadge } from '../../Recoil/atoms';
import { getUserData, updateUserCurrentBadge } from '../API/Login/fetchUser';
import { WhiteLoading } from '../UI/loading';

const UserTitleContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #c7d36f;

  button {
    margin: 20px 0px 20px 0px;
  }
`;

const UserTitleHeader = styled.section`
  display: flex;
  width: 100%;
  height: 17%;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  font-weight: 800;
  margin: 0 auto;
`;

const UserTitleList = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 27%);
  margin: 0 auto;
  grid-gap: 3%;
  width: 100%;
  height: 65%;
  justify-content: center;
  align-items: center;

  .earnedBadge {
    cursor: pointer;
    color: #3f3f3f;
    transform: scale(1.1);
    transition: transform 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    &:hover {
      transform: scale(1.05);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }

  .currentBadge {
    background-color: #9eb23b;
    color: #ffffff;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 40px;
    font-size: 19px;
    font-weight: 700;
    color: lightgray;
    background-color: #ffffff;
    margin: 0px 10px 0px 10px;
    padding: 10px;
    border-radius: 30px;
    cursor: not-allowed;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease;

    &:hover {
      &::after {
        content: attr(data-tip);
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
        padding: 5px 10px 5px 10px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.4);
        color: #ffffff;
        font-size: 12px;
        max-width: 350px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;

const badges = [
  { title: '나무 심기', description: '나무 첫 걸음' },
  { title: '첫 번째 나무', description: '첫 번째 질문 글 작성 ' },
  { title: '미니 수목원', description: '첫 번째 나무 요청' },
  {
    title: '친절의 씨앗',
    description: '5번 이상 나무 요청 & 매칭 성공 기록 3회 이상'
  },
  {
    title: '나는야 고수',
    description: '5번 이상 질문 글 작성 & 매칭 성공 기록 3회 이상'
  },
  {
    title: '배움의 매력',
    description: '15번 이상 질문 글 작성 & 매칭 성공 기록 10회 이상'
  },
  {
    title: '나눔의 즐거움',
    description: '나무 평가 평점 6.5점 이상 & 매칭 성공 기록 15회 이상'
  },
  {
    title: '성장의 열정',
    description: '나무 평가 평점 8.5점 이상 & 매칭 성공 기록 25회 이상'
  },
  {
    title: '품앗이 대장',
    description: '25번 이상 질문 글 작성 & 매칭 성공 기록 20회 이상'
  }
];

const UserTitle = () => {
  const currentUserData = useRecoilValue(userData);
  const userId = currentUserData.uuid;

  const selectedBadge = useRecoilValue(currentBadge);
  const setSelectedBadge = useSetRecoilState(currentBadge);

  useEffect(() => {}, [selectedBadge]);

  const {
    data: userTitleData,
    isLoading,
    refetch
  } = useQuery('requestData', async () => {
    const { userBadges, currentBadge } = await getUserData(userId);
    setSelectedBadge(currentBadge);
    return { userBadges, currentBadge };
  });

  const updateBadgeMutation = useMutation((updatedBadge) =>
    updateUserCurrentBadge(userId, updatedBadge)
  );

  const handleClick = (idx) => {
    setSelectedBadge(badges[idx].title);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  const handleBadgeChange = async () => {
    updateBadgeMutation.mutate(selectedBadge, {
      onSuccess: () => {
        Toast.fire({
          icon: 'success',
          title: '대표 목패가 변경되었습니다.'
        });
      },
      onError: (e) => {
        console.error('Error updating currentBadge:', e);
        Toast.fire({
          icon: 'error',
          title: '대표 목패 변경에 실패하였습니다. 다시 시도해주십시오.'
        });
      }
    });
  };

  return (
    <UserTitleContainer>
      <UserTitleHeader>나의 목패들</UserTitleHeader>
      <UserTitleList>
        {isLoading ? (
          <WhiteLoading />
        ) : (
          badges.map((el, idx) => (
            <div
              key={idx}
              className={
                userTitleData.userBadges.includes(el.title)
                  ? el.title === selectedBadge
                    ? 'currentBadge earnedBadge'
                    : 'earnedBadge'
                  : ''
              }
              data-tip={el.description}
              onClick={() => handleClick(idx)}
            >
              {el.title}
            </div>
          ))
        )}
        <Tooltip effect="solid" place="bottom" />
      </UserTitleList>
      <WhiteButton onClick={handleBadgeChange}>목패 변경</WhiteButton>
    </UserTitleContainer>
  );
};

export default UserTitle;
