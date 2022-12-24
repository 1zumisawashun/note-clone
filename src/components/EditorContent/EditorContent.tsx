import { EditorContent as TiptapEditorContent } from "@tiptap/react";
import styles from "./EditorContent.module.scss";

export type EditorContentProps = {
  editor: any;
};

export const EditorContent: React.FC<EditorContentProps> = ({ editor }) => {
  return <TiptapEditorContent editor={editor} className={styles.ProseMirror} />;
};
