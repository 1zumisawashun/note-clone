import { BubbleMenu as BubbleMenuTiptap, Editor } from "@tiptap/react";
import { useEffect, useState, useMemo } from "react";
import { useMenu, useDisclosure } from "../functions/hooks";
import styled from "@emotion/styled";
import { Tooltip } from "@mui/material";

const Container = styled("div")`
  display: flex;
  gap: 30px;
  background: white;
  padding: 5px 30px;
  border-radius: 10px;
  border: 1px solid black;
`;
const Item = styled("div")`
  height: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
const Popper = styled("div")`
  position: absolute;
  padding: 10px 0;
`;
const PopperInner = styled("div")`
  width: 150px;
  border-radius: 10px;
  background: white;
  padding: 10px;
  border: 1px solid black;
  display: grid;
  gap: 5px;
`;

export type MenuBubbleProps = {
  editor: Editor;
};

// NOTE:https://tiptap.dev/api/extensions/bubble-menu
// NOTE:内部的にtippy.jsを使っているっぽい
// NOTE:https://atomiks.github.io/tippyjs/
export const MenuBubble: React.FC<MenuBubbleProps> = ({ editor }) => {
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
      icon: null,
      label: "見出し",
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
      children: <p style={{ fontSize: "13px" }}>リスト</p>,
      icon: null,
      label: "リスト",
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
      children: "文章の配置",
      icon: null,
      label: "文章の配置",
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
  const listItems = [bulletList, orderedList, paragraph];
  const textAlignItems = [textAlignLeft, textAlignCenter, textAlignRight];

  return (
    <BubbleMenuTiptap
      editor={editor}
      tippyOptions={{
        duration: 100,
        maxWidth: 600,
      }}
    >
      <Container>
        {items.map((item, index) => (
          <Tooltip title={item.type} key={index} placement="top" arrow={true}>
            <div
              onMouseOver={item?.onMouseOver}
              onMouseLeave={item?.onMouseLeave}
              style={{ display: "relative" }}
            >
              <Item onClick={item.onClick} className={item.className}>
                {item.icon}
                {!["link", "blockquote"].includes(item.type)
                  ? item.label
                  : null}
              </Item>
              {headingDisclosure.isOpen && item.type === "headings" && (
                <Popper>
                  <PopperInner>
                    {headingItems.map((item) => (
                      <Item onClick={item.onClick} className={item.className}>
                        {item.icon}
                        {item.label}
                      </Item>
                    ))}
                  </PopperInner>
                </Popper>
              )}
              {textAlignDisclosure.isOpen && item.type === "textAligns" && (
                <Popper>
                  <PopperInner>
                    {textAlignItems.map((item) => (
                      <Item onClick={item.onClick} className={item.className}>
                        {item.icon}
                        {item.label}
                      </Item>
                    ))}
                  </PopperInner>
                </Popper>
              )}
              {listDisclosure.isOpen && item.type === "lists" && (
                <Popper>
                  <PopperInner>
                    {listItems.map((item) => (
                      <Item onClick={item.onClick} className={item.className}>
                        {item.icon}
                        {item.label}
                      </Item>
                    ))}
                  </PopperInner>
                </Popper>
              )}
            </div>
          </Tooltip>
        ))}
      </Container>
    </BubbleMenuTiptap>
  );
};
