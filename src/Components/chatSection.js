import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: calc(33.33% - 30px);
  height: calc(85%);
  background-color: #ffffff;
  margin: 0px 40px 50px 0px;
`;

const ChatSection = () => <ChatContainer></ChatContainer>;

export default ChatSection;
