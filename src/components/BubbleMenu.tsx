import { BubbleMenu as BubbleMenuTiptap, Editor } from "@tiptap/react";
import { useEffect, useState, useMemo } from "react";
import { useMenu, useDisclosure } from "../functions/hooks";
import styled from "@emotion/styled";

const Container = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Popper = styled("div")`
  position: absolute;
`;

export type BubbleMenuProps = {
  editor: Editor;
};

// NOTE:https://tiptap.dev/api/extensions/bubble-menu
// NOTE:内部的にtippy.jsを使っているっぽい
// NOTE:https://atomiks.github.io/tippyjs/
export const BubbleMenu: React.FC<BubbleMenuProps> = ({ editor }) => {
  const {
    bold,
    italic,
    strike,
    trash,
    heading2,
    heading3,
    paragraph,
    bulletList,
    orderedList,
    blockquote,
    textAlignLeft,
    textAlignCenter,
    textAlignRight,
    link,
  } = useMenu(editor);

  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  const headingDisclosure = useDisclosure();
  const textAlignDisclosure = useDisclosure();
  const listDisclosure = useDisclosure();

  const headings = useMemo(() => {
    return {
      type: "headings",
      onClick: () => null,
      onMouseOver: () => headingDisclosure.open(),
      onMouseLeave: () => headingDisclosure.close(),
      disabled: false,
      className: "",
      children: "見出し",
    };
  }, []);
  const lists = useMemo(() => {
    return {
      type: "lists",
      onClick: () => null,
      onMouseOver: () => listDisclosure.open(),
      onMouseLeave: () => listDisclosure.close(),
      disabled: false,
      className: "",
      children: "リスト",
    };
  }, []);
  const textAligns = useMemo(() => {
    return {
      type: "textAligns",
      onClick: () => null,
      onMouseOver: () => textAlignDisclosure.open(),
      onMouseLeave: () => textAlignDisclosure.close(),
      disabled: false,
      className: "",
      children: "配置",
    };
  }, []);

  const items = [
    headings,
    bold,
    strike,
    lists,
    textAligns,
    link,
    blockquote,
    trash,
  ];

  const headingItems = [heading2, heading3, paragraph];
  const listItems = [bulletList, orderedList];
  const textAlignItems = [textAlignLeft, textAlignCenter, textAlignRight];

  return (
    <BubbleMenuTiptap
      editor={editor}
      tippyOptions={{
        duration: 100,
        maxWidth: 600,
        interactive: true,
      }}
    >
      <Container>
        {items.map((item) => (
          <div
            onMouseOver={item?.onMouseOver}
            onMouseLeave={item?.onMouseLeave}
            style={{ display: "relative" }}
          >
            <button onClick={item.onClick} className={item.className}>
              {item.children}
            </button>
            {headingDisclosure.isOpen && item.type === "headings" && (
              <Popper>
                {headingItems.map((item) => (
                  <button onClick={item.onClick} className={item.className}>
                    {item.children}
                  </button>
                ))}
              </Popper>
            )}
            {textAlignDisclosure.isOpen && item.type === "textAligns" && (
              <Popper>
                {textAlignItems.map((item) => (
                  <button onClick={item.onClick} className={item.className}>
                    {item.children}
                  </button>
                ))}
              </Popper>
            )}
            {listDisclosure.isOpen && item.type === "lists" && (
              <Popper>
                {listItems.map((item) => (
                  <button onClick={item.onClick} className={item.className}>
                    {item.children}
                  </button>
                ))}
              </Popper>
            )}
          </div>
        ))}
      </Container>
    </BubbleMenuTiptap>
  );
};
