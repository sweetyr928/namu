import styled from 'styled-components';
import { Search } from '@mui/icons-material';
import { useState } from 'react';

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 3px solid #c7d36f;
  margin: 0 auto;
  padding: 0px 0px 0px 25px;
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  height: 40px;
  outline: none;

  ::placeholder {
    padding: 0px 0px 0px 5px;
    color: #c7d36f;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  top: 47%;
  left: 4px;
  transform: translateY(-50%);
  color: #c7d36f;
`;

const SearchInput = ({ placeholder, setSearchInputText }) => {
  const [inputText, setInputText] = useState('');

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchInputText(inputText);
    }
  };

  return (
    <InputWrapper>
      <Input
        type="text"
        placeholder={`${placeholder}`}
        onChange={handleChange}
        onKeyPress={handleOnKeyPress}
      />
      <SearchIcon fontSize="small" />
    </InputWrapper>
  );
};

export default SearchInput;
