import { EditorContent as TiptapEditorContent, Editor } from "@tiptap/react";
import { useDD } from "../../functions/hooks";
import { MenuButton } from "../MenuButton";
// css modulesで読み込まない
import "./EditorContent.scss";

export type EditorContentProps = {
  editor: Editor;
};

export const EditorContent: React.FC<EditorContentProps> = ({ editor }) => {
  const { dragRef } = useDD(editor);

  return (
    <div ref={dragRef}>
      <TiptapEditorContent editor={editor} style={{ position: "relative" }}>
        <MenuButton></MenuButton>
      </TiptapEditorContent>
    </div>
  );
};
