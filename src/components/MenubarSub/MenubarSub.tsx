import styles from "./MenubarSub.module.scss";
import { Editor } from "@tiptap/react";
import { AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";
// FIXME:radix-uiで統一した方がいいかも
import { RxCode, RxTextAlignJustify } from "react-icons/rx";

export type MenubarSubProps = {
  editor: Editor;
};

export const MenubarSub: React.FC<MenubarSubProps> = ({ editor }) => {
  return (
    <div className={styles.menubarContainer}>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <RxCode></RxCode>
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>

      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        p
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        br
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <AiOutlineUndo></AiOutlineUndo>
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <AiOutlineRedo></AiOutlineRedo>
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}
      >
        <RxTextAlignJustify></RxTextAlignJustify>
      </button>
    </div>
  );
};
