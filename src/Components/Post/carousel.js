import styled from 'styled-components';
import { useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarouselItem from './carouselItem';
import { GreenButton } from '../UI/button';
import { SkeletonCarousel } from '../UI/skeletonCarousel';
import { getPostsByTags } from '../API/Post/fetchPost';

const CarouselWrapper = styled.article`
  width: calc(90%);
  height: 80vh;

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

const TagWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 3vh 0vh 2vh 0vh;

  p {
    margin: 0px 0px 0px 10px;
    font-size: 20px;
    font-weight: 700;
  }

  button {
    background-color: transparent;
    border: none;
    margin: 0px 1px 0px 0px;
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: #c7d36f;
    }
  }
`;

const CarouselItemContainer = styled.section`
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

const GuideWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-weight: 800;
    font-size: 25px;
    margin: 30% auto;
  }

  div {
    font-weight: 800;
    font-size: 25px;
    margin: 0px 0px 30px 0px;
  }
`;

const Carousel = ({ tagList }) => {
  const carouselRef = useRef(null);

  const [tagIdx, setTagIdx] = useState(0);
  const [savedCarouselData, setSavedCarouselData] = useState({});

  const navigate = useNavigate();

  const { data: carouselData, isLoading } = useQuery(
    ['carouselData', tagList[tagIdx]],
    () => getPostsByTags(tagIdx, savedCarouselData, tagList),
    {
      enabled: tagList.length > 0,
      onSuccess: () => {
        setSavedCarouselData(carouselData);
      }
    },
    {
      refetchInterval: 30000,
      refetchIntervalInBackground: true
    }
  );

  const handleNavigate = useCallback(() => {
    navigate('/tag');
  }, []);

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

      setTagIdx(next);
    }
  };

  return (
    <>
      {isLoading ? (
        <SkeletonCarousel />
      ) : tagList.length > 0 ? (
        <CarouselWrapper>
          <TagWrapper>
            <p>{`# ${tagList[tagIdx]}`}</p>
            <button onClick={handleNavigate}>태그 추가</button>
          </TagWrapper>
          <Slider ref={carouselRef} {...settings}>
            {tagList.map((_) => (
              <CarouselItemContainer key={tagList[tagIdx]}>
                {carouselData &&
                  carouselData[tagList[tagIdx]] &&
                  carouselData[tagList[tagIdx]].map((post, i) => (
                    <CarouselItem
                      key={post.id}
                      title={post.title}
                      content={post.content}
                      createdAt={post.createdAt}
                      id={post.id}
                      isSolved={post.isSolved}
                    />
                  ))}
                {(!carouselData[tagList[tagIdx]] ||
                  carouselData[tagList[tagIdx]].length === 0) && (
                  <GuideWrapper>
                    <p>현재 해당 태그에 게시물이 없습니다.</p>
                  </GuideWrapper>
                )}
              </CarouselItemContainer>
            ))}
          </Slider>
        </CarouselWrapper>
      ) : (
        <GuideWrapper>
          <div>아직 태그를 설정하지 않았어요!</div>
          <div>지금 태그를 설정하러 가볼까요?</div>
          <GreenButton onClick={handleNavigate}>태그 설정하러 가기</GreenButton>
        </GuideWrapper>
      )}
    </>
  );
};

export default Carousel;
