import { BubbleMenu as BubbleMenuTiptap, Editor } from "@tiptap/react";
import React, { useEffect } from "react";
import styles from "./BubbleMenu.module.scss";
import { useDD, useLink } from "../../functions/hooks";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineUnorderedList,
  AiOutlineOrderedList,
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
  AiOutlineUpload,
} from "react-icons/ai";
// FIXME:radix-uiで統一した方がいいかも
import {
  RxLink1,
  RxLinkBreak1,
  RxDividerHorizontal,
  RxQuote,
  RxTrash,
} from "react-icons/rx";

export type BubbleMenuProps = {
  editor: Editor;
};

// NOTE:https://tiptap.dev/api/extensions/bubble-menu
// NOTE:内部的にtippy.jsを使っているっぽい
// NOTE:https://atomiks.github.io/tippyjs/
export const BubbleMenu: React.FC<BubbleMenuProps> = ({ editor }) => {
  const { addImage } = useDD(editor);
  const { setLink } = useLink(editor);

  const [isEditable, setIsEditable] = React.useState(true);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  return (
    <BubbleMenuTiptap editor={editor} tippyOptions={{ duration: 100 }}>
      <div className={styles.bubbleMenuContainer}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <AiOutlineBold></AiOutlineBold>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <AiOutlineItalic></AiOutlineItalic>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <AiOutlineStrikethrough></AiOutlineStrikethrough>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().deleteNode("reactComponent").run()
          }
        >
          <RxTrash></RxTrash>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          h1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          h2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          h3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <AiOutlineUnorderedList></AiOutlineUnorderedList>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <AiOutlineOrderedList></AiOutlineOrderedList>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <RxQuote></RxQuote>
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <RxDividerHorizontal></RxDividerHorizontal>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          <AiOutlineAlignLeft></AiOutlineAlignLeft>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
        >
          <AiOutlineAlignCenter></AiOutlineAlignCenter>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          <AiOutlineAlignRight></AiOutlineAlignRight>
        </button>

        <button>
          <label htmlFor="singleFile">
            <AiOutlineUpload></AiOutlineUpload>
          </label>
        </button>
        <input
          type="file"
          onChange={(e) => addImage(e.target.files)}
          hidden
          name="singleFile"
          id="singleFile"
        />
        <button
          onClick={setLink}
          className={editor.isActive("link") ? "is-active" : ""}
        >
          <RxLink1></RxLink1>
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
        >
          <RxLinkBreak1></RxLinkBreak1>
        </button>
      </div>
    </BubbleMenuTiptap>
  );
};
