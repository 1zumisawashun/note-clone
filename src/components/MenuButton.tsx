import { RxPlusCircled } from "react-icons/rx";
import { useState, SyntheticEvent } from "react";
import { Menu, MenuItem, Tooltip } from "@mui/material";
import { Editor } from "@tiptap/react";
import { useDD, useDisclosure, useMenu } from "../functions/hooks";

export type MenuButtonProps = {
  editor: Editor;
};

export const MenuButton: React.FC<MenuButtonProps> = ({ editor }) => {
  const { open, close, isOpen } = useDisclosure();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleOpen = (e: SyntheticEvent) => {
    setAnchorEl(e.currentTarget);
    open();
  };
  const handleClose = (e: SyntheticEvent) => {
    setAnchorEl(null);
    close();
  };

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
      <RxPlusCircled onClick={handleOpen} className="plusicon"></RxPlusCircled>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 0,
          horizontal: 60,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {items.map((item) => (
          <Tooltip title={item.type} key={item.type}>
            <MenuItem disabled={item.disabled}>
              <button onClick={item.onClick} className={item.className}>
                {item.children}
              </button>
            </MenuItem>
          </Tooltip>
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
