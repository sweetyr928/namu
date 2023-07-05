import styled from 'styled-components';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 10px 10px 10px;
  width: 90%;
  height: 60%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchedTagResult = (props) => (
  <ResultContainer>{props.children}</ResultContainer>
);

export default SearchedTagResult;
