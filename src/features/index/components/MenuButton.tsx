import { RxPlusCircled } from "react-icons/rx";
import { useState, SyntheticEvent } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Editor } from "@tiptap/react";
import { useMenu } from "../../../functions/hooks";
import styled from "@emotion/styled";

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

export type MenuButtonProps = {
  editor: Editor;
};

export const MenuButton: React.FC<MenuButtonProps> = ({ editor }) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleOpen = (e: SyntheticEvent) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e: SyntheticEvent) => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

  const {
    heading2,
    heading3,
    bulletList,
    orderedList,
    blockquote,
    horizontal,
    upload,
    link,
  } = useMenu(editor);

  const items = [
    upload,
    link,
    heading2,
    heading3,
    bulletList,
    orderedList,
    blockquote,
    horizontal,
  ];

  return (
    <div id="tooltip" style={{ display: "none" }}>
      <RxPlusCircled
        // onMouseOver={handleOpen}
        onClick={handleOpen}
        className="plusicon"
      ></RxPlusCircled>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        // MenuListProps={{ onMouseLeave: handleClose }}
        anchorOrigin={{
          vertical: 0,
          horizontal: 60,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {items.map((item, index) => (
          <MenuItem disabled={item.disabled} key={index} onClick={item.onClick}>
            <Item className={item.className}>
              {item.icon}
              {item.label}
            </Item>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
