import styled from 'styled-components';

const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: calc(90%);
  height: calc(80%);
  background-color: #ffffff;
  margin: 0px 20px 50px 100px;
`;

const AllSection = (props) => <AllContainer>{props.children}</AllContainer>;

export default AllSection;
