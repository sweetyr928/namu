import { useState, useCallback } from 'react';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  writeBatch
} from 'firebase/firestore';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { db } from '../firebase';
import PostSection from '../Components/UI/postSection';
import TextEditor from '../Components/Post/textEditor';
import TagInput from '../Components/UI/tagInput';
import { GreenButton } from '../Components/UI/button';

const TitleInput = styled.input`
  border: 2px solid #c7d36f;
  border-radius: 10px;
  margin: 25px auto 10px auto;
  padding: 0px 0px 0px 10px;
  font-size: 16px;
  font-weight: 500;
  width: 79%;
  height: 33px;
  outline: none;
`;

const EditorWrapper = styled.article`
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

const ButtonWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 10px;
  flex-shrink: 0;

  button:first-child {
    margin: 0px 20px 0px 0px;
  }
`;

const CreatePost = ({ uid }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagList, setTagList] = useState([]);
  let newPostID = '';
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const createPost = async () => {
    const currentTime = serverTimestamp();
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        author: uid,
        content,
        title,
        tags: tagList,
        isSolved: false,
        createdAt: currentTime
      });

      newPostID = docRef.id;

      const tagsRef = collection(db, 'tags');
      const batch = writeBatch(db);

      for (const tag of tagList) {
        const tagDocRef = doc(tagsRef, tag);
        const tagDoc = await getDoc(tagDocRef);

        if (tagDoc.exists()) {
          batch.update(tagDocRef, { [docRef.id]: true });
        } else {
          const initialTagData = {
            [docRef.id]: true
          };
          batch.set(tagDocRef, initialTagData);
        }
      }

      await batch.commit();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  const handleSave = async () => {
    if (
      !title.length ||
      (content.trim() === '' && !content.includes('<p')) ||
      !tagList.length
    ) {
      Toast.fire({
        icon: 'error',
        title: '모든 항목(제목/내용/태그)을 정확히 입력했는지 확인해주세요.'
      });
    } else {
      await createPost();
      Toast.fire({
        icon: 'success',
        title: '질문이 등록되었습니다.'
      });
      navigate('/', { state: { comp: 'detail', id: newPostID } });
    }
  };

  const handleGoBack = useCallback(() => {
    navigate('/');
  }, []);

  return (
    <PostSection>
      <TitleInput
        type="text"
        placeholder="제목을 입력하세요."
        onChange={handleChange}
      />
      <EditorWrapper>
        <TextEditor content={content} setContent={setContent} />
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
