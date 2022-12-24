import "./BubbleMenu.module.scss";

import { BubbleMenu as BubbleMenuTiptap } from "@tiptap/react";
import React, { useEffect } from "react";

export type BubbleMenuProps = {
  editor: any;
};

// NOTE:https://tiptap.dev/api/extensions/bubble-menu
export const BubbleMenu: React.FC<BubbleMenuProps> = ({ editor }) => {
  const [isEditable, setIsEditable] = React.useState(true);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  return (
    <>
      {editor && (
        <BubbleMenuTiptap editor={editor} tippyOptions={{ duration: 100 }}>
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
        </BubbleMenuTiptap>
      )}
    </>
  );
};
