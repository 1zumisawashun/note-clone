import { EditorContent as TiptapEditorContent } from "@tiptap/react";
import "./Tiptap.modules.scss";

export type EditorContentProps = {
  editor: any;
};

export const EditorContent: React.FC<EditorContentProps> = ({ editor }) => {
  return <TiptapEditorContent editor={editor} />;
};
