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
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const ReactQuillEditor = ({
  style,
  defaultValue = '',
  onChange,
}: ReactQuillEditorProps) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const onChangeHandler = (e: string) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];

        const data = {
          id: 123,
          url: 'https://i.namu.wiki/i/GQMqb8jtiqpCo6_US7jmWDO30KfPB2MMvbdURVub61Rs6ALKqbG-nUATj-wNk7bXXWIDjiLHJxWYkTELUgybkA.webp',
        };

        try {
          const editor = quillRef.current?.getEditor();
          const range =
            editor?.getSelection()?.index ?? editor?.getLength() ?? 0;
          editor?.insertEmbed(range, 'image', data.url); // 에디터에 이미지 삽입
          editor?.setSelection((range ?? 0) + 1);

          // 추가된 로직: 삽입된 이미지 엘리먼트에 data-imageId 속성 추가
          // 1. 에디터 컨테이너를 가져옵니다.
          const quillEditor = quillRef.current?.editor?.root;
          if (quillEditor) {
            // 2. 가장 마지막에 삽입된 이미지(<img>)를 찾습니다.
            const images = quillEditor.querySelectorAll('img');
            const latestImage = images[images.length - 1];

            // 3. 찾은 이미지 엘리먼트에 data-imageId 속성을 추가합니다.
            if (latestImage) {
              latestImage.setAttribute(
                'data-imageId',
                `${images.length}-${String(data.id)}`
              );

              // 이미지 업로드 후, 새로운 onChange 콜백을 호출하여 최신 상태를 전달
              setTimeout(() => {
                onChangeHandler(quillEditor?.getHTML());
              }, 100);
            }
          }
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
        defaultValue={defaultValue}
        onChange={onChangeHandler}
        className={'[*>ql-container>img]:inline-block'}
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
