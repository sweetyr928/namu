import { useRef, useState, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import CarouselItem from './carouselItem';
import { GreenButton } from '../UI/button';
import { getPostsByTags } from '../API/Post/fetchPost';

const CarouselWrapper = styled.article`
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

const TagWrapper = styled.section`
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
    margin: 0px 1px 0px 0px;
    font-size: medium;
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

  div {
    font-weight: 800;
    font-size: 25px;
    margin: 0px 0px 30px 0px;
  }
`;

const Carousel = ({ setComp, tagList }) => {
  const carouselRef = useRef(null);
  const [tagIdx, setTagIdx] = useState(0);
  const [carouselData, setCarouselData] = useState({});
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate('/tag');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const resultData = await getPostsByTags(tagIdx, carouselData, tagList);
      setCarouselData(resultData);
    };
    fetchData();
  }, [tagIdx]);

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

  return (
    <>
      {tagList.length ? (
        <CarouselWrapper>
          <TagWrapper>
            <p>{`# ${tagList[tagIdx]}`}</p>
            <button onClick={handleNavigate}>태그 추가</button>
          </TagWrapper>
          <Slider ref={carouselRef} {...settings}>
            {tagList.map((_, idx) => (
              <CarouselItemContainer key={idx}>
                {carouselData[tagList[tagIdx]] &&
                  carouselData[tagList[tagIdx]].map((post, i) => (
                    <CarouselItem
                      key={i}
                      title={post.title}
                      content={post.content}
                      createdAt={post.createdAt}
                      id={post.id}
                      setComp={setComp}
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
          <GreenButton onClick={handleNavigate}>태그 설정하러 가기</GreenButton>
        </GuideWrapper>
      )}
    </>
  );
};

export default Carousel;
