import styled from 'styled-components';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import SearchInput from '../Components/UI/searchInput';
import SearchedTagResult from '../Components/Tag/tagList';
import TagItem from '../Components/Tag/tagItem';
import TagInput from '../Components/UI/tagInput';
import { GreenButton } from '../Components/UI/button';
import PostSection from '../Components/UI/postSection';

const EditTagContainer = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 10px;
  flex-shrink: 0;

  button:first-child {
    margin: 0px 20px 0px 0px;
  }
`;

const GuideWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    font-weight: 600;
    font-size: 20px;
    margin: calc(80%) 0px 0px 0px;
  }
`;

const EditTag = () => {
  const [tagList, setTagList] = useState([]);
  const [searchInputText, setSearchInputText] = useState('');
  const [searchedTagList, setSearchedTagList] = useState([]);
  const navigate = useNavigate();

  const handleSave = () => {
    navigate('/');
  };

  const handleGoBack = useCallback(() => {
    navigate('/');
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
    <PostSection>
      <EditTagContainer>
        <SearchInput
          placeholder={`추가하고픈 태그를 검색해주세요!`}
          setSearchInputText={setSearchInputText}
        />
        <SearchedTagResult>
          {searchedTagList.length ? (
            searchedTagList.map((el, idx) => (
              <TagItem
                key={idx}
                category={el.id}
                postCount={el.postCount}
                tagList={tagList}
                setTagList={setTagList}
              />
            ))
          ) : (
            <GuideWrapper>
              <div>검색 결과가 없습니다.</div>
            </GuideWrapper>
          )}
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
    </PostSection>
  );
};

export default EditTag;
