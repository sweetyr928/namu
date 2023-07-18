import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PostSection from '../Components/UI/postSection';
import SearchInput from '../Components/UI/searchInput';
import SearchPostResult from '../Components/Search/searchList';
import SearchItem from '../Components/Search/searchItem';
import { searchPosts } from '../Components/API/Post/fetchPost';

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

const SearchPage = () => {
  const { state } = useLocation();
  const [searchInputText, setSearchInputText] = useState('');
  const [searchResult, setSearchResult] = useState(
    state ? state.searchResult : []
  );

  useEffect(() => {
    const fetchSearchResult = async () => {
      if (searchInputText.trim() !== '') {
        const result = await searchPosts(searchInputText);
        setSearchResult(result);
      }
      if (searchInputText.trim() === '' && !state) setSearchResult([]);
    };
    fetchSearchResult();
  }, [searchInputText, state]);

  return (
    <PostSection>
      <SearchInput
        placeholder={`검색어를 입력해주세요.`}
        setSearchInputText={setSearchInputText}
      />
      <SearchPostResult>
        {searchResult.length ? (
          searchResult.map((el, idx) => (
            <SearchItem
              key={idx}
              title={el.title}
              content={el.content}
              createdAt={el.createdAt}
              id={el.id}
              searchResult={searchResult}
            />
          ))
        ) : (
          <GuideWrapper>
            <div>검색 결과가 없습니다.</div>
          </GuideWrapper>
        )}
      </SearchPostResult>
    </PostSection>
  );
};

export default SearchPage;
