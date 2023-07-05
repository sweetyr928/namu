import { useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const TextEditor = () => {
  const quillRef = useRef();
  const [content, setContent] = useState('');

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, 'link', 'image']
        ]
      }
    }),
    []
  );

  return (
    <div style={{ margin: '50px' }}>
      <ReactQuill
        style={{ width: '600px', height: '600px' }}
        placeholder="질문 내용을 입력해주세요."
        theme="snow"
        ref={quillRef}
        value={content}
        onChange={setContent}
        modules={modules}
      />
    </div>
  );
};

export default TextEditor;
