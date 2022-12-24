import { BubbleMenu as BubbleMenuTiptap, Editor } from "@tiptap/react";
import React, { useEffect } from "react";
import styles from "./BubbleMenu.module.scss";

export type BubbleMenuProps = {
  editor: Editor;
};

// NOTE:https://tiptap.dev/api/extensions/bubble-menu
// NOTE:内部的にtippy.jsを使っているっぽい
// NOTE:https://atomiks.github.io/tippyjs/
export const BubbleMenu: React.FC<BubbleMenuProps> = ({ editor }) => {
  const [isEditable, setIsEditable] = React.useState(true);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  return (
    <BubbleMenuTiptap editor={editor} tippyOptions={{ duration: 100 }}>
      <div className={styles.bubbleMenuContainer}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          strike
        </button>
      </div>
    </BubbleMenuTiptap>
  );
};
