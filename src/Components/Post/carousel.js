import { useRef } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarouselItem from './carouselItem';

const CarouselWrapper = styled.div`
  width: calc(90%);
  height: 100%;

  .slick-prev::before,
  .slick-next::before {
    color: #9eb23b;
    font-size: 27px;
  }

  .slick-list {
    background-color: #9eb23b;
    border-radius: 10px;
    margin: 0px 0px 0px 7px;
  }
`;

const CarouselItemContainer = styled.div`
  width: 100%;
  height: 63vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Carousel = () => {
  const carouselRef = useRef(null);

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
      },
      {
        title: '커스텀 훅이 정확히 무엇인가요?',
        content:
          '리액트를 공부하다가 커스텀 훅이라는 것을 알게 되었습니다. 커스텀 훅이 정확히 무엇인지, 어떨 때 사용하는지 예제를 사용해 설명해 주실 천사분을 찾습니다. 도와주...',
        date: '2023-06-30'
      }
    ]
  ];

  return (
    <CarouselWrapper>
      <Slider ref={carouselRef} {...settings}>
        {tagPostLists.map((postList, idx) => (
          <CarouselItemContainer key={idx}>
            {postList.map((post, i) => (
              <CarouselItem
                key={i}
                title={post.title}
                content={post.content}
                date={post.date}
              />
            ))}
          </CarouselItemContainer>
        ))}
      </Slider>
    </CarouselWrapper>
  );
};

export default Carousel;
