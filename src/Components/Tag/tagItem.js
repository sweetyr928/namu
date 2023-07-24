import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useCallback } from 'react';
import { GreenButton } from '../UI/button';

const ResultItem = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 10px 0px 10px;
  padding: 20px 20px 20px 20px;
  width: calc(100%);
  height: calc(7%);
  border-bottom: 2px solid #c7d36f;
  cursor: pointer;

  div:first-child {
    font-weight: 700;
    font-size: 14px;
    margin: 0px 0px 0px 15px;

    @media (min-width: 1024px) {
      font-size: 16px;
    }

    @media (min-width: 1440px) {
      font-size: 18px;
    }
  }

  div:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(30%);

    div:first-child {
      font-size: 15px;
      font-weight: 700;
    }
  }
`;

const TagItem = ({ category, postCount, tagList, setTagList }) => {
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

  const handleAddTag = useCallback(() => {
    if (!tagList.includes(category)) setTagList([...tagList, category]);
    else
      Toast.fire({
        icon: 'error',
        title: '이미 추가된 태그입니다.'
      });
  }, []);

  return (
    <ResultItem onClick={handleAddTag}>
      <div>{`# ${category}`}</div>
      <div>
        <div>{`게시글 수: ${postCount} `}</div>
        <GreenButton>추가</GreenButton>
      </div>
    </ResultItem>
  );
};

export default TagItem;
