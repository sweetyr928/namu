import styled from 'styled-components';

const ResultContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 10px 10px 10px;
  width: 90%;
  height: 80%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchPostResult = (props) => (
  <ResultContainer>{props.children}</ResultContainer>
);

export default SearchPostResult;
