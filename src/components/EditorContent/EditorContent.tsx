import { EditorContent as TiptapEditorContent, Editor } from "@tiptap/react";
// css modulesで読み込まない
import "./EditorContent.scss";

export type EditorContentProps = {
  editor: Editor;
};

export const EditorContent: React.FC<EditorContentProps> = ({ editor }) => {
  return <TiptapEditorContent editor={editor} />;
};
