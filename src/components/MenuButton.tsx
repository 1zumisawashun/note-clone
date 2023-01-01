import { RxPlusCircled } from "react-icons/rx";
import { useState, SyntheticEvent } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Editor } from "@tiptap/react";
import { useDD, useMenu } from "../functions/hooks";

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

  const { addImage } = useDD(editor);
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
          <MenuItem disabled={item.disabled} key={index}>
            <button onClick={item.onClick} className={item.className}>
              {item.children}
            </button>
          </MenuItem>
        ))}
      </Menu>
      <input
        type="file"
        onChange={(e) => addImage(e.target.files)}
        hidden
        name="singleFile"
        id="singleFile"
      />
    </div>
  );
};
