import styled from 'styled-components';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: calc(60% - 10px);
  height: calc(75%);
  background-color: #ffffff;
  margin: 0px 20px 50px 0px;
`;

const PostSection = (props) => <PostContainer>{props.children}</PostContainer>;

export default PostSection;
