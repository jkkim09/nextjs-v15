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
      if (!editor) return;

      const range = editor.getSelection()?.index ?? editor.getLength() ?? 0;

      // 이미지를 삽입할 위치에 `insertEmbed`를 호출합니다.
      editor.insertEmbed(range, 'image', data.url);

      // 삽입된 이미지 블롯을 가져옵니다.
      // getLeaf()는 Blot 객체와 오프셋을 포함하는 배열을 반환합니다.
      const [blot] = editor.getLeaf(range);

      // blot 객체에 domNode가 존재하는지 확인합니다.
      if (blot && blot.domNode) {
        const insertedNode = blot.domNode as HTMLElement;

        // insertedNode의 tagName을 확인하여 이미지가 맞는지 검증합니다.
        if (insertedNode.tagName === 'IMG') {
          const imageElement = insertedNode as HTMLImageElement;
          imageElement.setAttribute(
            'data-id',
            `${Date.now()}-${String(data.id)}`
          );
        }
      }

      // 커서를 삽입된 이미지 뒤로 이동시킵니다.
      editor.setSelection(range + 1);

      const quillEditor = quillRef.current?.editor?.root;
      if (quillEditor) {
        setTimeout(() => {
          onChangeHandler(quillEditor.innerHTML);
        }, 100);
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
