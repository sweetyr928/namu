import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: calc(33.33% - 30px);
  height: calc(75%);
  background-color: #ffffff;
  margin: 0px 20px 50px 0px;
`;

const ChatSection = (props) => <ChatContainer>{props.children}</ChatContainer>;

export default ChatSection;
