import { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarouselItem from './carouselItem';
import { GreenButton } from '../UI/button';

const CarouselWrapper = styled.div`
  width: calc(90%);
  height: 100%;

  .slick-prev::before,
  .slick-next::before {
    color: #c7d36f;
    font-size: 27px;
  }

  .slick-list {
    background-color: #c7d36f;
    border-radius: 10px;
    margin: 0px 0px 0px 7px;
  }
`;

const TagWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 30px 0px 20px 0px;

  p {
    margin: 0px 0px 0px 10px;
    font-size: x-large;
    font-weight: 700;
  }

  button {
    background-color: transparent;
    border: none;
    margin: 0px 10px 0px 0px;
    font-size: medium;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: #c7d36f;
    }
  }
`;

const CarouselItemContainer = styled.div`
  width: 100%;
  height: 68vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const GuideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    font-weight: 800;
    font-size: 25px;
    margin: 0px 0px 30px 0px;
  }
`;

const Carousel = ({ setPostDetail, tagList, setComp }) => {
  const carouselRef = useRef(null);
  const [tagIdx, setTagIdx] = useState(0);

  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
    arrows: true,
    beforeChange: (current, next) => {
      const carouselElement = carouselRef.current;

      if (carouselElement && carouselElement.scrollTo) {
        carouselElement.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }

      if (next > current) {
        if (tagIdx < tagList.length - 1) setTagIdx((prevIdx) => prevIdx + 1);
        else setTagIdx(0);
      } else if (next < current) {
        if (tagIdx > 0) setTagIdx((prevIdx) => prevIdx - 1);
        else setTagIdx(tagList.length - 1);
      }
    }
  };

  const tagPostLists = [
    [
      {
        title:
          'filter 함수가 제대로 돌아가지 않습니다 ㅠㅠ 어떻게 해야 하나요?',
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
    ],
    [
      {
        title:
          'filter 함수가 제대로 돌아가지 않습니다 ㅠㅠ 어떻게 해야 하나요?',
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
      }
    ]
  ];

  return (
    <>
      {tagList.length ? (
        <CarouselWrapper>
          <TagWrapper>
            <p>{`# ${tagList[tagIdx]}`}</p>
            <button onClick={() => setComp('tag')}>태그 추가</button>
          </TagWrapper>
          <Slider ref={carouselRef} {...settings}>
            {tagList.map((_, idx) => (
              <CarouselItemContainer key={idx}>
                {tagPostLists[tagIdx].map((post, i) => (
                  <CarouselItem
                    key={i}
                    category={tagList[tagIdx]}
                    title={post.title}
                    content={post.content}
                    date={post.date}
                    idx={i}
                    setPostDetail={setPostDetail}
                  />
                ))}
              </CarouselItemContainer>
            ))}
          </Slider>
        </CarouselWrapper>
      ) : (
        <GuideWrapper>
          <div>아직 태그를 설정하지 않았어요!</div>
          <div>지금 태그를 설정하러 가볼까요?</div>
          <GreenButton>태그 설정하러 가기</GreenButton>
        </GuideWrapper>
      )}
    </>
  );
};

export default Carousel;
