import styled from 'styled-components';
import { useState, useCallback, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '../../firebase';
import SearchInput from '../UI/searchInput';
import SearchedTagResult from './tagList';
import TagItem from './tagItem';
import TagInput from '../UI/tagInput';
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

const EditTag = ({ setComp }) => {
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

  const [tagList, setTagList] = useState([]);
  const [searchInputText, setSearchInputText] = useState('');
  const [searchedTagList, setSearchedTagList] = useState(tempSearchedList);

  const handleSave = () => {
    setComp('list');
  };

  const handleGoBack = useCallback(() => {
    setComp('list');
  }, []);

  const searchTags = async (text) => {
    const tagsRef = collection(db, 'tags');

    try {
      const querySnapshot = await getDocs(tagsRef);

      const results = querySnapshot.docs
        .filter((doc) => doc.id.includes(text))
        .map((doc) => {
          const tagData = doc.data();
          const postCount = Object.keys(tagData).length || 0;
          return {
            id: doc.id,
            postCount
          };
        });

      setSearchedTagList(results);
    } catch (error) {
      console.error('Error searching tags: ', error);
    }
  };

  useEffect(() => {
    if (searchInputText) {
      searchTags(searchInputText);
    } else {
      setSearchedTagList([]);
    }
  }, [searchInputText]);

  return (
    <EditTagContainer>
      <SearchInput
        placeholder={`추가하고픈 태그를 검색해주세요!`}
        setSearchInputText={setSearchInputText}
      />
      <SearchedTagResult>
        {searchedTagList.map((el, idx) => (
          <TagItem
            key={idx}
            category={el.id}
            postCount={el.postCount}
            tagList={tagList}
            setTagList={setTagList}
          />
        ))}
      </SearchedTagResult>
      <TagInput
        tagList={tagList}
        setTagList={setTagList}
        explainText={`나의 태그 목록`}
        inputWidth={90}
      />
      <ButtonWrapper>
        <GreenButton onClick={handleSave}>저장</GreenButton>
        <GreenButton onClick={handleGoBack}>취소</GreenButton>
      </ButtonWrapper>
    </EditTagContainer>
  );
};

export default EditTag;
