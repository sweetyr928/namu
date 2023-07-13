import styled from 'styled-components';
import { useState, useCallback, useEffect } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { GreenButton } from '../UI/button';
import RequestModal from './requestModal';
import 'react-quill/dist/quill.core.css';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 20px 20px 20px;
  width: 95%;
  height: 100%;
`;

const ContentHeader = styled.div`
  display: flex;
  height: 10%;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 10px 0px 0px 10px;
  flex-shrink: 0;

  div {
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0px 5px 0px;

    @media (min-width: 1024px) {
      font-size: 20px;
    }

    @media (min-width: 1440px) {
      font-size: 22px;
    }
  }

  span {
    font-size: 12px;
    font-weight: 300;
    align-self: flex-end;

    @media (min-width: 1024px) {
      font-size: 14px;
      margin: 0px 0px 0px 0px;
    }

    @media (min-width: 1440px) {
      font-size: 16px;
      margin: 0px 15px 0px 0px;
    }
  }
`;

const ContentDetail = styled.div`
  margin: 10px 10px 10px 10px;
  height: 72%;
  overflow-y: scroll;
  scroll-behavior: smooth;

  div {
    width: 100%;
    letter-spacing: 1px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;

    @media (min-width: 1024px) {
      font-size: 16px;
    }

    @media (min-width: 1440px) {
      font-size: 18px;
    }
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c7d36f;
    border-radius: 5px;
    height: 1%;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const ContentFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 10px;
  flex-shrink: 0;

  button:first-child {
    margin: 0px 20px 0px 0px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #c7d36f;
  margin: 5px 0px 5px 0px;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const fetchPostData = async (id) => {
  try {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const postData = docSnap.data();
      return postData;
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error fetching post data: ', error);
  }
};

const PostDetail = ({ setComp, selectedId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postData, setPostData] = useState({});
  const formattedDate = postData?.createdAt
    ? new window.Date(postData.createdAt.seconds * 1000)
    : null;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPostData(selectedId);
      setPostData(data);
    };

    fetchData();
  }, [selectedId]);

  const handleGoBack = useCallback(() => {
    setComp('list');
  }, []);

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, []);

  return (
    <>
      {isModalOpen ? (
        <>
          <RequestModal toggleModal={toggleModal}></RequestModal>
          <ModalBackground onClick={toggleModal} />
        </>
      ) : null}
      <ContentContainer>
        <ContentHeader>
          <div>{postData.title}</div>
          <span>{formattedDate && formattedDate.toLocaleString()}</span>
        </ContentHeader>
        <Divider />
        <ContentDetail>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(postData.content)
            }}
          ></div>
        </ContentDetail>
        <Divider />
        <ContentFooter>
          <GreenButton onClick={toggleModal}>나무 하러 가기</GreenButton>
          <GreenButton onClick={handleGoBack}>뒤로 가기</GreenButton>
        </ContentFooter>
      </ContentContainer>
    </>
  );
};

export default PostDetail;
