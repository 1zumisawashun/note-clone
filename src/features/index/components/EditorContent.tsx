import { EditorContent as TiptapEditorContent, Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import "../../../assets/scss/editor.scss";

export function EditorContent({ editor }: { editor: Editor }) {
  return (
    <TiptapEditorContent editor={editor} style={{ position: "relative" }}>
      <MenuButton editor={editor} />
    </TiptapEditorContent>
  );
}
