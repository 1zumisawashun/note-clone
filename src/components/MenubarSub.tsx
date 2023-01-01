import { Editor } from "@tiptap/react";
import styled from "@emotion/styled";
import { useMenu } from "../functions/hooks";

const Container = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 10px 0;
`;

export type MenubarSubProps = {
  editor: Editor;
};

export const MenubarSub: React.FC<MenubarSubProps> = ({ editor }) => {
  const {
    code,
    clearMarks,
    clearNodes,
    paragraph,
    codeBlock,
    hardBreak,
    undo,
    redo,
    textAlignJustify,
  } = useMenu(editor);

  const items = [
    code,
    clearMarks,
    clearNodes,
    paragraph,
    codeBlock,
    hardBreak,
    undo,
    redo,
    textAlignJustify,
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
    </Container>
  );
};
