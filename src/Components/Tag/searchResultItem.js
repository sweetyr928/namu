import styled from 'styled-components';

const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 10px 10px 10px;
  padding: 20px 20px 20px 20px;
  width: calc(100%);
  border-bottom: 2px solid #c7d36f;

  div:first-child {
    font-weight: 800;
    font-size: 19px;
    margin: 0px 0px 0px 15px;
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

    button {
      background-color: transparent;
      border: none;
      margin: 0px 15px 0px 0px;
      font-size: medium;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        color: #c7d36f;
      }
    }
  }
`;

const SearchResultItem = ({ category, postCount, tagList, handleTagList }) => {
  const handleAddTag = () => {
    if (!tagList.includes(category)) handleTagList([...tagList, category]);
    else alert('이미 추가된 카테고리 입니다!');
  };

  return (
    <ResultItem>
      <div>{`# ${category}`}</div>
      <div>
        <div>{`게시글 수: ${postCount} `}</div>
        <button onClick={handleAddTag}>추가하기</button>
      </div>
    </ResultItem>
  );
};

export default SearchResultItem;
