import styled from 'styled-components';
import { GreenButton } from '../UI/button';

const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 10px 10px 10px;
  padding: 20px 20px 20px 20px;
  width: calc(100%);
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
  const handleAddTag = () => {
    if (!tagList.includes(category)) setTagList([...tagList, category]);
    else alert('이미 추가된 카테고리 입니다!');
  };

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
