import styled from 'styled-components';
import { useState } from 'react';
import PostSection from '../Components/UI/postSection';
import SearchInput from '../Components/UI/searchInput';
import SearchPostResult from '../Components/Search/searchList';
import SearchItem from '../Components/Search/searchItem';

const GuideWrapper = styled.div`
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

  const searchResultList = [
    {
      title: 'filter 함수가 제대로 돌아가지 않습니다 ㅠㅠ 어떻게 해야 하나요?',
      content:
        '현재 리액트를 사용하여 간단한 투두 리스트 앱을 만들고 있습니다. 완료되지 않은 투두 리스트만 뽑아 보여주려고 하는데 filter 함수 부분에서 막혔습니다. 저를 도와주...',
      date: '2023-06-29'
    },
    {
      title:
        '프론트엔드 공부 중인 학생입니다. 리액트와 뷰의 차이를 설명해 주실 분 계신가요?',
      content:
        '리액트와 뷰의 장단점, 차이점을 알고 싶습니다. 실무에서는 어떤 프레임워크가 더 많이 사용되나요?',
      date: '2023-06-30'
    },
    {
      title: '커스텀 훅이 정확히 무엇인가요?',
      content:
        '리액트를 공부하다가 커스텀 훅이라는 것을 알게 되었습니다. 커스텀 훅이 정확히 무엇인지, 어떨 때 사용하는지 예제를 사용해 설명해 주실 천사분을 찾습니다. 도와주...',
      date: '2023-06-30'
    },
    {
      title:
        '프론트엔드 공부 중인 학생입니다. 리액트와 뷰의 차이를 설명해 주실 분 계신가요?',
      content:
        '리액트와 뷰의 장단점, 차이점을 알고 싶습니다. 실무에서는 어떤 프레임워크가 더 많이 사용되나요?',
      date: '2023-06-30'
    },
    {
      title: '커스텀 훅이 정확히 무엇인가요?',
      content:
        '리액트를 공부하다가 커스텀 훅이라는 것을 알게 되었습니다. 커스텀 훅이 정확히 무엇인지, 어떨 때 사용하는지 예제를 사용해 설명해 주실 천사분을 찾습니다. 도와주...',
      date: '2023-06-30'
    },
    {
      title:
        '프론트엔드 공부 중인 학생입니다. 리액트와 뷰의 차이를 설명해 주실 분 계신가요?',
      content:
        '리액트와 뷰의 장단점, 차이점을 알고 싶습니다. 실무에서는 어떤 프레임워크가 더 많이 사용되나요?',
      date: '2023-06-30'
    },
    {
      title: '커스텀 훅이 정확히 무엇인가요?',
      content:
        '리액트를 공부하다가 커스텀 훅이라는 것을 알게 되었습니다. 커스텀 훅이 정확히 무엇인지, 어떨 때 사용하는지 예제를 사용해 설명해 주실 천사분을 찾습니다. 도와주...',
      date: '2023-06-30'
    }
  ];

  return (
    <PostSection>
      <SearchInput
        placeholder={`검색어를 입력해주세요.`}
        handleInputText={setSearchInputText}
      />
      <SearchPostResult>
        {searchResultList.length ? (
          searchResultList.map((el, idx) => (
            <SearchItem
              key={idx}
              category={`리액트`}
              title={el.title}
              content={el.content}
              date={el.date}
              idx={el.idx}
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
