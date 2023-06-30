import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CarouselWrapper = styled.div`
  width: calc(93%);
  height: calc(85%);
  margin: 0px 10px 0px 10px;

  .slick-prev::before,
  .slick-next::before {
    color: #9eb23b;
  }
`;

const Carousel = () => {
  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
    arrows: true
  };
  return (
    <CarouselWrapper>
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </CarouselWrapper>
  );
};

export default Carousel;
