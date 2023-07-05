import styled from 'styled-components';
import { useState } from 'react';
import SearchInput from '../UI/searchInput';
import SearchResultList from '../UI/searchResultList';
import TagItem from './tagItem';
import MyTagList from './myTagList';
import { GreenButton } from '../UI/button';

const EditTagContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 10px;
  flex-shrink: 0;

  button:first-child {
    margin: 0px 20px 0px 0px;
  }
`;

const EditTag = ({ handleComp }) => {
  const tempSearchedList = [
    {
      category: '리액트',
      postCount: 41
    },
    {
      category: '리액트 네이티브',
      postCount: 19
    },
    {
      category: '리액트 상태관리',
      postCount: 5
    }
  ];

  const [tagList, setTagList] = useState(['개발', '리액트']);
  const [searchInputText, setSearchInputText] = useState('');
  const [searchedTagList, setSearchedTagList] = useState(tempSearchedList);

  const handleSave = () => {
    handleComp('list');
  };

  const handleGoBack = () => {
    handleComp('list');
  };

  return (
    <EditTagContainer>
      <SearchInput
        placeholder={`추가하고픈 태그를 검색해주세요!`}
        handleInputText={setSearchInputText}
      />
      <SearchResultList>
        {searchedTagList.map((el, idx) => (
          <TagItem
            key={idx}
            category={el.category}
            postCount={el.postCount}
            tagList={tagList}
            handleTagList={setTagList}
          />
        ))}
      </SearchResultList>
      <MyTagList tagList={tagList} handleTagList={setTagList} />
      <ButtonWrapper>
        <GreenButton onClick={handleSave}>저장</GreenButton>
        <GreenButton onClick={handleGoBack}>취소</GreenButton>
      </ButtonWrapper>
    </EditTagContainer>
  );
};

export default EditTag;
