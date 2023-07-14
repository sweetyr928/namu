import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import PostSection from '../Components/UI/postSection';
import SearchInput from '../Components/UI/searchInput';
import SearchPostResult from '../Components/Search/searchList';
import SearchItem from '../Components/Search/searchItem';

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

const Search = () => {
  const [searchInputText, setSearchInputText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const searchPosts = async (text) => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));

    const stripHTMLTags = (html) => html.textContent || html.innerText || '';

    try {
      const querySnapshot = await getDocs(q);
      const results = [];

      querySnapshot.forEach((doc) => {
        const post = doc.data();
        const sanitizedContent = stripHTMLTags(post.content);

        if (
          post.title.indexOf(text) !== -1 ||
          (sanitizedContent.indexOf(text) !== -1 && sanitizedContent.length)
        ) {
          results.push({ id: doc.id, ...post });
        }
      });

      setSearchResult(results);
      setSearchInputText('');
    } catch (error) {
      console.error('Error searching posts: ', error);
    }
  };

  useEffect(() => {
    if (searchInputText.length) searchPosts(searchInputText);
  }, [searchInputText]);

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

export default Search;
