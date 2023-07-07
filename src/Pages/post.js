import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PostSection from '../Components/UI/postSection';
import TextEditor from '../Components/Post/textEditor';
import TagInput from '../Components/UI/tagInput';
import { GreenButton } from '../Components/UI/button';

const TitleInput = styled.input`
  border: 3px solid #c7d36f;
  border-radius: 20px;
  margin: 20px auto 0px auto;
  padding: 0px 0px 0px 20px;
  font-size: 19px;
  font-weight: 700;
  width: 78%;
  height: 35px;
  outline: none;
`;

const EditorWrapper = styled.div`
  width: 100%;
  height: 68%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px auto 0px auto;

  .ql-container.ql-snow {
    height: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 10px;
  flex-shrink: 0;

  button:first-child {
    margin: 0px 20px 0px 0px;
  }
`;

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagList, setTagList] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSave = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <PostSection>
      <TitleInput
        type="text"
        placeholder="제목을 입력하세요."
        onChange={handleChange}
      />
      <EditorWrapper>
        <TextEditor />
      </EditorWrapper>
      <TagInput
        tagList={tagList}
        setTagList={setTagList}
        explainText={`태그를 입력하세요.`}
        inputWidth={80}
      />
      <ButtonWrapper>
        <GreenButton onClick={handleSave}>게시</GreenButton>
        <GreenButton onClick={handleGoBack}>취소</GreenButton>
      </ButtonWrapper>
    </PostSection>
  );
};

export default CreatePost;
