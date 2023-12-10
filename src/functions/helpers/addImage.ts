import { Editor } from "@tiptap/react";

export function addImage({ src, editor }: { src: string; editor: Editor }) {
  editor.chain().focus().setImage({ src }).run();
}
