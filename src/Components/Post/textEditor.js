import { useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase';

Quill.register('modules/ImageResize', ImageResize);

const TextEditor = () => {
  const quillRef = useRef();
  const [content, setContent] = useState('');

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const editor = quillRef.current.getEditor();
      const file = input.files[0];
      const range = editor.getSelection(true);
      try {
        const storageRef = ref(storage, `image/${Date.now()}`);
        await uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            editor.insertEmbed(range.index, 'image', url);
            editor.setSelection(range.index + 1);
          });
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

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
        ],
        handlers: {
          image: imageHandler
        }
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
