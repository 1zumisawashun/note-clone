import { BubbleMenu as BubbleMenuTiptap, Editor } from "@tiptap/react";
import React, { useEffect } from "react";
import { useDD, useMenu } from "../functions/hooks";
import styled from "@emotion/styled";

const Container = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export type BubbleMenuProps = {
  editor: Editor;
};

// NOTE:https://tiptap.dev/api/extensions/bubble-menu
// NOTE:内部的にtippy.jsを使っているっぽい
// NOTE:https://atomiks.github.io/tippyjs/
export const BubbleMenu: React.FC<BubbleMenuProps> = ({ editor }) => {
  const { addImage } = useDD(editor);
  const {
    bold,
    italic,
    strike,
    trash,
    heading1,
    heading2,
    heading3,
    bulletList,
    orderedList,
    blockquote,
    horizontal,
    textAlignLeft,
    textAlignCenter,
    textAlignRight,
    upload,
    link,
    linkBreak,
  } = useMenu(editor);

  const [isEditable, setIsEditable] = React.useState(true);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  const items = [
    bold,
    italic,
    strike,
    trash,
    heading1,
    heading2,
    heading3,
    bulletList,
    orderedList,
    blockquote,
    horizontal,
    textAlignLeft,
    textAlignCenter,
    textAlignRight,
    upload,
    link,
    linkBreak,
  ];

  return (
    <BubbleMenuTiptap editor={editor} tippyOptions={{ duration: 100 }}>
      <Container>
        {items.map((item) => (
          <button
            onClick={item.onClick}
            disabled={item.disabled}
            className={item.className}
          >
            {item.children}
          </button>
        ))}
        <input
          type="file"
          onChange={(e) => addImage(e.target.files)}
          hidden
          name="singleFile"
          id="singleFile"
        />
      </Container>
    </BubbleMenuTiptap>
  );
};
