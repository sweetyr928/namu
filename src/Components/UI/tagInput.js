import styled from 'styled-components';

const TagInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 10px 10px 10px;
  width: 90%;

  div:first-child {
    align-self: start;
    font-weight: 600;
    font-size: 18px;
    margin: 10px 0px 10px 5px;
  }
`;

const TagsInput = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 98%;
  height: 33px;
  padding: 2px 9px 2px 2px;
  border: 3px solid #c7d36f;
  border-radius: 20px;

  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0px 0px 0px 0px;

    > .tag {
      width: auto;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      padding: 0px 4px 0px 4px;
      font-size: 15px;
      list-style: none;
      border-radius: 20px;
      margin: 2px 3px 4px 2px;
      background: #c7d36f;

      > .tag-title {
        color: #ffffff;
        margin: 0px 0px 0px 3px;
        font-weight: 600;
      }

      > .tag-close-icon {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 14px;
        font-weight: 900;
        margin-left: 4px;
        color: #ffffff;
        border-radius: 30%;
        background: transparent;
        cursor: pointer;
      }

      > .tag-close-icon:hover {
        color: #ffffff;
        background: #9eb23b;
      }
    }
  }

  > input {
    flex: 1;
    border: none;
    font-size: 15px;
    padding: 4px 0px 0px 0px;
    height: 25px;
    margin: 0px 0px 0px 6px;
    outline: none;
  }
`;

const TagInput = ({ tagList = [], setTagList, explainText, inputWidth }) => {
  const removeTags = (idxToRemove) => {
    setTagList(tagList.filter((_, idx) => idx !== idxToRemove));
  };

  const addTags = (e) => {
    const newTag = e.target.value.trim();
    const filtered = tagList.filter((el) => el === newTag);
    if (newTag !== '' && filtered.length === 0 && e.key === 'Enter') {
      const updatedTagList = [...tagList, newTag];
      setTagList(updatedTagList);
      e.target.value = '';
    }
  };

  return (
    <TagInputWrapper style={{ width: inputWidth ? `${inputWidth}%` : '90%' }}>
      <div>{`${explainText}`}</div>
      <TagsInput>
        <ul id="tags">
          {tagList.map((tag, idx) => (
            <li key={idx} className="tag">
              <span className="tag-title">{tag}</span>
              <span
                role="presentation"
                className="tag-close-icon"
                onClick={() => removeTags(idx)}
              >
                &times;
              </span>
            </li>
          ))}
        </ul>
        <input
          className="tag-input"
          type="text"
          onKeyUp={addTags}
          placeholder={!tagList.length ? 'e.g. (피아노 아이폰 육아)' : ''}
        />
      </TagsInput>
    </TagInputWrapper>
  );
};

export default TagInput;
