import styled from 'styled-components';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 10px 10px 10px;
  width: 90%;
  height: 55%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchResultList = (props) => (
  <ResultContainer>{props.children}</ResultContainer>
);

export default SearchResultList;
