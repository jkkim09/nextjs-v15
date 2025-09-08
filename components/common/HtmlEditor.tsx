import { useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { ImageResize } from 'quill-image-resize-module-ts'; //1.import

if (typeof window !== 'undefined' && window.Quill) {
  window.Quill = Quill;
} //2. Quill을 window 전역 객체에 할당하여 전역으로 사용

Quill.register('modules/ImageResize', ImageResize); //3.Quill 모듈을 등록

interface ReactQuillEditorProps {
  style?: any;
  value?: string;
  onChange?: (value: string) => void;
}

const ReactQuillEditor = ({
  style,
  value,
  onChange,
}: ReactQuillEditorProps) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];

        const data = {
          url: 'https://i.namu.wiki/i/GQMqb8jtiqpCo6_US7jmWDO30KfPB2MMvbdURVub61Rs6ALKqbG-nUATj-wNk7bXXWIDjiLHJxWYkTELUgybkA.webp',
        };

        try {
          const editor = quillRef.current?.getEditor();
          const range =
            editor?.getSelection()?.index ?? editor?.getLength() ?? 0;
          editor?.insertEmbed(range, 'image', data.url); // 에디터에 이미지 삽입
          editor?.setSelection((range ?? 0) + 1);
        } catch (error) {
          console.error('Image upload failed:', error);
        }
      }
    };
  };

  // 이미지 정렬
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ['bold', 'italic', 'underline', 'strike' /* , 'blockquote' */],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          [{ color: [] }, { background: [] }],
          ['clean'],
          ['link', 'image'],
          [{ align: [] }],
        ],
        handlers: {
          image: handleImageUpload, // 이미지 버튼 클릭시 커스텀 핸들러 실행
        },
      },
      ImageResize: {
        modules: ['Resize', 'DisplaySize'],
      }, //4.Quill 이미지 Resize 옵션 설정(Resize:이미지 드래그 크기 조절/DisplaySize:현재 이미지 크기 표시)
    }),
    []
  );

  return (
    <>
      <ReactQuill
        ref={quillRef}
        style={style}
        modules={modules}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
export default ReactQuillEditor;

declare global {
  interface Window {
    Quill?: typeof Quill;
  }
}
