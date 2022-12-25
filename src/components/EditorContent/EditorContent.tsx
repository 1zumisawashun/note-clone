import { EditorContent as TiptapEditorContent, Editor } from "@tiptap/react";
import { useDD } from "../../functions/hooks";
// css modulesで読み込まない
import "./EditorContent.scss";

export type EditorContentProps = {
  editor: Editor;
};

export const EditorContent: React.FC<EditorContentProps> = ({ editor }) => {
  const { dragRef } = useDD(editor);

  return (
    <div ref={dragRef}>
      <TiptapEditorContent editor={editor} />
    </div>
  );
};
