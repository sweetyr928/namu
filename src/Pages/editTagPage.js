import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { GreenButton } from '../Components/UI/button';
import { GreenLoading } from '../Components/UI/loading';
import SearchInput from '../Components/UI/searchInput';
import PostSection from '../Components/UI/postSection';
import TagInput from '../Components/UI/tagInput';
import { userData } from '../Recoil/atoms';
import SearchedTagResult from '../Components/Tag/tagList';
import TagItem from '../Components/Tag/tagItem';
import {
  getSearchedTags,
  getUserTags,
  updateUserTags
} from '../Components/API/Tag/fetchTag';

const EditTagPageContainer = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const GuideWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    font-weight: 600;
    font-size: 20px;
    margin: calc(80%) 0px 0px 0px;
  }
`;

const EditTagPage = () => {
  const navigate = useNavigate();

  const currentUserData = useRecoilValue(userData);

  const { data: userTagList, isLoading } = useQuery(
    ['userData', currentUserData.uuid],
    () => getUserTags(currentUserData.uuid),
    {
      enabled: !!currentUserData.uuid
    }
  );

  const [tagList, setTagList] = useState(userTagList || []);
  const [searchInputText, setSearchInputText] = useState('');
  const [searchedTagList, setSearchedTagList] = useState([]);

  const updateTagMutation = useMutation((updatedTags) =>
    updateUserTags(currentUserData.uuid, updatedTags)
  );

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

  const handleSave = useCallback(() => {
    if (tagList.length < 2 || !tagList.length) {
      Toast.fire({
        icon: 'error',
        title: '태그를 최소 두 개 이상 설정해주세요.'
      });
    } else {
      updateTagMutation.mutate(tagList, {
        onSuccess: () => {
          Toast.fire({
            icon: 'success',
            title: '태그 목록이 수정되었습니다.'
          });
          navigate('/');
        },
        onError: (e) => {
          console.error('Error updating userTags:', e);
          Toast.fire({
            icon: 'error',
            title: '태그 목록 수정에 실패하였습니다. 다시 시도해주십시오.'
          });
        }
      });
    }
  }, [tagList]);

  const handleGoBack = useCallback(() => {
    navigate('/');
  }, []);

  const searchTags = useCallback(async (text) => {
    try {
      const results = await getSearchedTags(text);
      setSearchedTagList(results);
    } catch (error) {
      console.error('Error searching tags: ', error);
    }
  }, []);

  useEffect(() => {
    if (searchInputText) {
      searchTags(searchInputText);
    } else {
      setSearchedTagList([]);
    }
  }, [searchInputText]);

  return (
    <PostSection>
      <EditTagPageContainer>
        <SearchInput
          placeholder={`추가하고픈 태그를 검색해주세요!`}
          setSearchInputText={setSearchInputText}
        />
        <SearchedTagResult>
          {searchedTagList?.length ? (
            searchedTagList.map((el) => (
              <TagItem
                key={el.id}
                category={el.id}
                postCount={el.postCount}
                tagList={tagList}
                setTagList={setTagList}
              />
            ))
          ) : (
            <GuideWrapper>
              <div>검색 결과가 없습니다.</div>
            </GuideWrapper>
          )}
        </SearchedTagResult>
        {isLoading ? (
          <GreenLoading />
        ) : (
          <TagInput
            tagList={tagList}
            setTagList={setTagList}
            explainText={`나의 태그 목록`}
            inputWidth={90}
          />
        )}

        <ButtonWrapper>
          <GreenButton onClick={handleSave}>저장</GreenButton>
          <GreenButton onClick={handleGoBack}>취소</GreenButton>
        </ButtonWrapper>
      </EditTagPageContainer>
    </PostSection>
  );
};

export default EditTagPage;
