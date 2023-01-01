import { Editor } from "@tiptap/react";
import { useMemo } from "react";
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
  AiOutlineRedo,
  AiOutlineUndo,
} from "react-icons/ai";
// FIXME:radix-uiで統一した方がいいかも
import {
  RxLink1,
  RxLinkBreak1,
  RxDividerHorizontal,
  RxQuote,
  RxTrash,
  RxCode,
  RxTextAlignJustify,
} from "react-icons/rx";
import { useLink } from ".";

export const useMenu = (editor: Editor) => {
  const { setLink } = useLink(editor);

  const bold = useMemo(() => {
    return {
      type: "bold",
      onClick: () => editor.chain().focus().toggleBold().run(),
      disabled: !editor.can().chain().focus().toggleBold().run(),
      className: editor.isActive("bold") ? "is-active" : "",
      children: <AiOutlineBold></AiOutlineBold>,
    };
  }, []);

  const italic = useMemo(() => {
    return {
      type: "italic",
      onClick: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
      className: editor.isActive("italic") ? "is-active" : "",
      children: <AiOutlineItalic></AiOutlineItalic>,
    };
  }, []);

  const strike = useMemo(() => {
    return {
      type: "strike",
      onClick: () => editor.chain().focus().toggleStrike().run(),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
      className: editor.isActive("strike") ? "is-active" : "",
      children: <AiOutlineStrikethrough></AiOutlineStrikethrough>,
    };
  }, []);

  const trash = useMemo(() => {
    return {
      type: "trash",
      onClick: () => editor.chain().focus().deleteNode("paragraph").run(),
      disabled: false,
      className: "",
      children: <RxTrash></RxTrash>,
    };
  }, []);

  const heading1 = useMemo(() => {
    return {
      type: "heading",
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      disabled: false,
      className: editor.isActive("heading", { level: 1 }) ? "is-active" : "",
      children: "h1",
    };
  }, []);

  const heading2 = useMemo(() => {
    return {
      type: "heading",
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      disabled: false,
      className: editor.isActive("heading", { level: 2 }) ? "is-active" : "",
      children: "h2",
    };
  }, []);

  const heading3 = useMemo(() => {
    return {
      type: "heading",
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      disabled: false,
      className: editor.isActive("heading", { level: 3 }) ? "is-active" : "",
      children: "h3",
    };
  }, []);

  const bulletList = useMemo(() => {
    return {
      type: "bulletList",
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      disabled: false,
      className: editor.isActive("bulletList") ? "is-active" : "",
      children: <AiOutlineUnorderedList></AiOutlineUnorderedList>,
    };
  }, []);

  const orderedList = useMemo(() => {
    return {
      type: "orderedList",
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      disabled: false,
      className: editor.isActive("orderedList") ? "is-active" : "",
      children: <AiOutlineOrderedList></AiOutlineOrderedList>,
    };
  }, []);

  const blockquote = useMemo(() => {
    return {
      type: "blockquote",
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      disabled: false,
      className: editor.isActive("blockquote") ? "is-active" : "",
      children: <RxQuote></RxQuote>,
    };
  }, []);

  const horizontal = useMemo(() => {
    return {
      type: "horizontal",
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      disabled: false,
      className: "",
      children: <RxDividerHorizontal></RxDividerHorizontal>,
    };
  }, []);

  const textAlignLeft = useMemo(() => {
    return {
      type: "textAlign",
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      disabled: false,
      className: editor.isActive({ textAlign: "left" }) ? "is-active" : "",
      children: <AiOutlineAlignLeft></AiOutlineAlignLeft>,
    };
  }, []);

  const textAlignCenter = useMemo(() => {
    return {
      type: "textAlign",
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      disabled: false,
      className: editor.isActive({ textAlign: "center" }) ? "is-active" : "",
      children: <AiOutlineAlignCenter></AiOutlineAlignCenter>,
    };
  }, []);

  const textAlignRight = useMemo(() => {
    return {
      type: "textAlign",
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      disabled: false,
      className: editor.isActive({ textAlign: "right" }) ? "is-active" : "",
      children: <AiOutlineAlignRight></AiOutlineAlignRight>,
    };
  }, []);

  const upload = useMemo(() => {
    return {
      type: "upload",
      onClick: () => null,
      disabled: false,
      className: "",
      children: (
        <label htmlFor="singleFile">
          <AiOutlineUpload></AiOutlineUpload>
        </label>
      ),
    };
  }, []);

  const link = useMemo(() => {
    return {
      type: "link",
      onClick: () => setLink(),
      disabled: false,
      className: editor.isActive("link") ? "is-active" : "",
      children: <RxLink1></RxLink1>,
    };
  }, []);

  const linkBreak = useMemo(() => {
    return {
      type: "link",
      onClick: () => editor.chain().focus().unsetLink().run(),
      disabled: !editor.isActive("link"),
      className: "",
      children: <RxLinkBreak1></RxLinkBreak1>,
    };
  }, []);

  const code = useMemo(() => {
    return {
      type: "code",
      onClick: () => editor.chain().focus().toggleCode().run(),
      disabled: !editor.can().chain().focus().toggleCode().run(),
      className: editor.isActive("code") ? "is-active" : "",
      children: <RxCode></RxCode>,
    };
  }, []);
  const clearMarks = useMemo(() => {
    return {
      type: "clear",
      onClick: () => editor.chain().focus().unsetAllMarks().run(),
      disabled: false,
      className: "",
      children: "clear marks",
    };
  }, []);
  const clearNodes = useMemo(() => {
    return {
      type: "clear",
      onClick: () => editor.chain().focus().clearNodes().run(),
      disabled: false,
      className: "",
      children: "clear nodes",
    };
  }, []);
  const paragraph = useMemo(() => {
    return {
      type: "paragraph",
      onClick: () => editor.chain().focus().setParagraph().run(),
      disabled: false,
      className: editor.isActive("paragraph") ? "is-active" : "",
      children: "p",
    };
  }, []);
  const codeBlock = useMemo(() => {
    return {
      type: "codeBlock",
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      disabled: false,
      className: editor.isActive("codeBlock") ? "is-active" : "",
      children: "code block",
    };
  }, []);
  const hardBreak = useMemo(() => {
    return {
      type: "hardBreak",
      onClick: () => editor.chain().focus().setHardBreak().run(),
      disabled: false,
      className: "",
      children: "br",
    };
  }, []);
  const undo = useMemo(() => {
    return {
      type: "undo",
      onClick: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().chain().focus().undo().run(),
      className: "",
      children: <AiOutlineUndo></AiOutlineUndo>,
    };
  }, []);
  const redo = useMemo(() => {
    return {
      type: "redo",
      onClick: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().chain().focus().redo().run(),
      className: "",
      children: <AiOutlineRedo></AiOutlineRedo>,
    };
  }, []);
  const textAlignJustify = useMemo(() => {
    return {
      type: "textAlign",
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      disabled: false,
      className: editor.isActive({ textAlign: "justify" }) ? "is-active" : "",
      children: <RxTextAlignJustify></RxTextAlignJustify>,
    };
  }, []);

  return {
    //main
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
    //sub
    code,
    clearMarks,
    clearNodes,
    paragraph,
    codeBlock,
    hardBreak,
    undo,
    redo,
    textAlignJustify,
  };
};
