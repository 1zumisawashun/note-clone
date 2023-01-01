import { Editor } from "@tiptap/react";
import { useDD, useMenu } from "../functions/hooks";
import styled from "@emotion/styled";

const Container = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 10px 0;
`;

export type MenubarProps = {
  editor: Editor;
};

export const Menubar: React.FC<MenubarProps> = ({ editor }) => {
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
  );
};
