import { useEffect, useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { ImageResize } from 'quill-image-resize-module-ts';

if (typeof window !== 'undefined' && window.Quill) {
  window.Quill = Quill;
}

Quill.register('modules/ImageResize', ImageResize);

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

  const fileImageEdit = (file: File) => {
    console.log('input', file);

    // API 업로드 후 이미지 URL을 가져옵니다.
    const data = {
      id: 123,
      url: 'https://i.namu.wiki/i/GQMqb8jtiqpCo6_US7jmWDO30KfPB2MMvbdURVub61Rs6ALKqbG-nUATj-wNk7bXXWIDjiLHJxWYkTELUgybkA.webp',
    };

    try {
      const editor = quillRef.current?.getEditor();
      const range = editor?.getSelection()?.index ?? editor?.getLength() ?? 0;
      editor?.insertEmbed(range, 'image', data.url); // 에디터에 이미지 삽입
      editor?.setSelection((range ?? 0) + 1);

      // 추가된 로직: 삽입된 이미지 엘리먼트에 data-id 속성 추가
      const quillEditor = quillRef.current?.editor?.root;
      if (quillEditor) {
        const images = quillEditor.querySelectorAll('img');
        const latestImage = images[images.length - 1];

        if (latestImage) {
          latestImage.setAttribute(
            'data-id',
            `${images.length}-${String(data.id)}`
          );

          // 이미지 업로드 후, 새로운 onChange 콜백을 호출하여 최신 상태를 전달
          setTimeout(() => {
            onChangeHandler(quillEditor?.getHTML());
          }, 100);
        }
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
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
        fileImageEdit(file);
      }
    };
  };

  // 이미지 정렬 및 모듈 설정
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ['bold', 'italic', 'underline', 'strike'],
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
          image: handleImageUpload, // 이미지 버튼 클릭 시 커스텀 핸들러 실행
        },
      },
      ImageResize: {
        modules: ['Resize', 'DisplaySize'],
      },
    }),
    []
  );

  // 드롭 이벤트 핸들러
  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    // 드롭 이벤트 핸들러 추가
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        const droppedFile = files[0];
        fileImageEdit(droppedFile);
      }
    };

    const editorContainer = quill.root;
    editorContainer.addEventListener('drop', handleDrop, true); // capture phase에서 이벤트 리스너 실행

    return () => {
      editorContainer.removeEventListener('drop', handleDrop, true);
    };
  }, []);

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
