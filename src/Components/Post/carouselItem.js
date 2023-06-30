import styled from 'styled-components';

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px 10px 10px 10px;
  padding: 10px 10px 10px 10px;
  border-radius: 20px;
  background-color: #ffffff;
  width: calc(95%);
  height: calc(15%);
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Content = styled.div`
  font-size: 16px;
  font-weight: 600;
  /* margin: 5px 0px 0px 0px; */
`;

const Date = styled.span`
  font-size: 14px;
  font-weight: 300;
  /* margin: 5px 0px 0px 0px; */
  align-self: flex-end;
`;

const CarouselItem = ({ title, content, date }) => (
  <ItemWrapper>
    <Title>{title}</Title>
    <Content>{content}</Content>
    <Date>{date}</Date>
  </ItemWrapper>
);

export default CarouselItem;
