import styled from 'styled-components';
import { useState, useCallback } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Swal from 'sweetalert2';
import { useQuery, useMutation } from 'react-query';
import { getDoc, doc } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { GreenButton } from '../Components/UI/button';
import RequestModal from '../Components/Post/requestModal';
import 'react-quill/dist/quill.core.css';
import PostSection from '../Components/UI/postSection';
import { getPost, deletePost } from '../Components/API/Post/fetchPost';
import { GreenLoading } from '../Components/UI/loading';
import { db } from '../firebase';
import { userData } from '../Recoil/atoms';

const ContentContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 20px 20px 20px;
  width: 95%;
  height: 100%;
`;

const ContentHeader = styled.header`
  display: flex;
  height: 10%;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0px 0px 0px 10px;
  flex-shrink: 0;

  .div-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .title {
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
  .icon {
    margin: 0px 0px 1px 0px;
    cursor: pointer;
    font-weight: bold;
  }

  span {
    font-size: 13px;
    font-weight: 500;
    align-self: flex-end;
    margin: 0px 5px 0px 0px;

    @media (min-width: 1024px) {
      font-size: 15px;
    }

    @media (min-width: 1440px) {
      font-size: 17px;
    }
  }
`;

const MenuContainer = styled.div`
  display: ${(props) => (props.$isMenuOpen ? 'block' : 'none')};
  position: absolute;
  top: 30px;
  right: 3px;
  background-color: #fff;
  border: 1px solid #c7d36f;
  border-radius: 4px;
  padding: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px 5px 5px 5px;
  font-size: medium;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ContentDetail = styled.section`
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

const ContentFooter = styled.footer`
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

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentUserData = useRecoilValue(userData);

  const { data: postData, isLoading } = useQuery(
    ['post', id],
    () => getPost(id),
    {
      enabled: !!id,

      onError: (error) => {
        console.error('Error fetching post:', error);
      }
    }
  );

  const deletePostMutation = useMutation((pid) =>
    deletePost(currentUserData.uuid, pid)
  );

  const formattedDate = postData?.createdAt
    ? new window.Date(postData.createdAt.seconds * 1000)
    : null;

  const handleHamburgerClick = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, []);

  const handleEdit = useCallback(() => {
    navigate(`/posts/${id}/edit`, { state: { id, postData } });
  }, []);

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

  const handleDelete = useCallback(async () => {
    try {
      const result = await Swal.fire({
        text: '정말로 이 게시글을 삭제하시겠습니까?',
        showCancelButton: true,
        confirmButtonColor: '#c7d36f',
        cancelButtonColor: '#d33',
        confirmButtonText: '예, 삭제합니다',
        cancelButtonText: '취소'
      });

      if (result.isConfirmed) {
        deletePostMutation.mutate(id, {
          onSuccess: () => {
            Toast.fire({
              icon: 'success',
              title: '삭제 완료되었습니다.'
            });
            navigate(`/`);
          },
          onError: (e) => {
            console.error('Error deletings post:', e);
            Toast.fire({
              icon: 'error',
              title: '삭제 실패했습니다. 다시 시도해주십시오.'
            });
          }
        });
      }
    } catch (error) {
      console.error('Error deleting post: ', error);
    }
  }, []);

  const handleGoBack = useCallback(() => {
    if (state && state.searchResult) {
      navigate('/search', { state: { searchResult: state.searchResult } });
    } else {
      navigate(-1);
    }
  }, [state, navigate]);

  const openModal = useCallback(async () => {
    const requestId = `${id}-${currentUserData.uuid}`;
    const docRef = doc(db, 'requests', requestId);

    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      Toast.fire({
        icon: 'info',
        title: '이미 요청을 보냈던 게시글입니다.'
      });
    } else {
      setIsModalOpen(!isModalOpen);
    }
  }, [isModalOpen]);

  const closeModal = useCallback(async () => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const options = {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  return (
    <PostSection>
      {isLoading && <GreenLoading />}
      {isModalOpen && (
        <>
          <RequestModal
            title={postData.title}
            closeModal={closeModal}
            postId={id}
            helperId={currentUserData.uuid}
            helperLevel={currentUserData.userLevel}
            requesterId={postData.author}
          ></RequestModal>
          <ModalBackground onClick={closeModal} />
        </>
      )}
      {!isLoading && (
        <ContentContainer>
          <ContentHeader>
            <div className="div-wrapper">
              <div className="title">{postData.title}</div>
              {postData.author === currentUserData.uuid && (
                <div className="icon">
                  <MenuRoundedIcon
                    onClick={handleHamburgerClick}
                    style={{ color: '#c7d36f', fontSize: '33px' }}
                  />
                </div>
              )}
              <MenuContainer $isMenuOpen={isMenuOpen}>
                <MenuItem onClick={handleEdit}>수정</MenuItem>
                <MenuItem onClick={handleDelete}>삭제</MenuItem>
              </MenuContainer>
            </div>
            <span>
              {formattedDate && formattedDate.toLocaleString('ko-KR', options)}
            </span>
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
            <GreenButton onClick={openModal}>나무 하러 가기</GreenButton>
            <GreenButton onClick={handleGoBack}>뒤로 가기</GreenButton>
          </ContentFooter>
        </ContentContainer>
      )}
    </PostSection>
  );
};

export default PostDetailPage;
