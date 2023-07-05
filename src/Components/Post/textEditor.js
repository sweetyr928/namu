import { useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize';

Quill.register('modules/ImageResize', ImageResize);

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
      },
      ImageResize: {
        parchment: Quill.import('parchment')
      }
    }),
    []
  );

  return (
    <div style={{ width: '80%', height: '90%' }}>
      <ReactQuill
        style={{ width: '100%', height: '100%' }}
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
