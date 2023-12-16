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
import { BaseSyntheticEvent } from "react";
import { addImage } from "../helpers/addImage";
import { getDataUrl } from "../helpers/getDataUrl";

export const useMenu = (editor: Editor) => {
  const { setLink } = useLink(editor);

  const handleUpload = async (e: BaseSyntheticEvent) => {
    const files = e.target.files;
    const src = await getDataUrl({ files });

    if (!src) {
      alert("error");
      return;
    }

    addImage({ src, editor });
  };

  const bold = useMemo(() => {
    return {
      type: "bold",
      onClick: () => editor.chain().focus().toggleBold().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: !editor.can().chain().focus().toggleBold().run(),
      className: editor.isActive("bold") ? "is-active" : "",
      children: <AiOutlineBold></AiOutlineBold>,
      icon: <AiOutlineBold></AiOutlineBold>,
      label: "",
    };
  }, []);

  const italic = useMemo(() => {
    return {
      type: "italic",
      onClick: () => editor.chain().focus().toggleItalic().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: !editor.can().chain().focus().toggleItalic().run(),
      className: editor.isActive("italic") ? "is-active" : "",
      children: <AiOutlineItalic></AiOutlineItalic>,
      icon: <AiOutlineItalic></AiOutlineItalic>,
      label: "",
    };
  }, []);

  const strike = useMemo(() => {
    return {
      type: "strike",
      onClick: () => editor.chain().focus().toggleStrike().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: !editor.can().chain().focus().toggleStrike().run(),
      className: editor.isActive("strike") ? "is-active" : "",
      children: <AiOutlineStrikethrough></AiOutlineStrikethrough>,
      icon: <AiOutlineStrikethrough></AiOutlineStrikethrough>,
      label: "",
    };
  }, []);

  const trash = useMemo(() => {
    return {
      type: "trash",
      onClick: () => editor.chain().focus().deleteSelection().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: "",
      children: <RxTrash></RxTrash>,
      icon: <RxTrash></RxTrash>,
      label: "",
    };
  }, []);

  const heading1 = useMemo(() => {
    return {
      type: "heading",
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: editor.isActive("heading", { level: 1 }) ? "is-active" : "",
      children: "h1",
      icon: null,
      label: "",
    };
  }, []);

  const heading2 = useMemo(() => {
    return {
      type: "heading",
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: editor.isActive("heading", { level: 2 }) ? "is-active" : "",
      children: "h2",
      icon: null,
      label: "大見出し",
    };
  }, []);

  const heading3 = useMemo(() => {
    return {
      type: "heading",
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: editor.isActive("heading", { level: 3 }) ? "is-active" : "",
      children: "h3",
      icon: null,
      label: "小見出し",
    };
  }, []);

  const bulletList = useMemo(() => {
    return {
      type: "bulletList",
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: editor.isActive("bulletList") ? "is-active" : "",
      children: <AiOutlineUnorderedList></AiOutlineUnorderedList>,
      icon: <AiOutlineUnorderedList></AiOutlineUnorderedList>,
      label: "箇条書きリスト",
    };
  }, []);

  const orderedList = useMemo(() => {
    return {
      type: "orderedList",
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: editor.isActive("orderedList") ? "is-active" : "",
      children: <AiOutlineOrderedList></AiOutlineOrderedList>,
      icon: <AiOutlineOrderedList></AiOutlineOrderedList>,
      label: "番号付きリスト",
    };
  }, []);

  const blockquote = useMemo(() => {
    return {
      type: "blockquote",
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: editor.isActive("blockquote") ? "is-active" : "",
      children: <RxQuote></RxQuote>,
      icon: <RxQuote></RxQuote>,
      label: "引用",
    };
  }, []);

  const horizontal = useMemo(() => {
    return {
      type: "horizontal",
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: "",
      children: <RxDividerHorizontal></RxDividerHorizontal>,
      icon: <RxDividerHorizontal></RxDividerHorizontal>,
      label: "区切り線",
    };
  }, []);

  const textAlignLeft = useMemo(() => {
    return {
      type: "textAlign",
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: editor.isActive({ textAlign: "left" }) ? "is-active" : "",
      children: <AiOutlineAlignLeft></AiOutlineAlignLeft>,
      icon: <AiOutlineAlignLeft></AiOutlineAlignLeft>,
      label: "指定なし",
    };
  }, []);

  const textAlignCenter = useMemo(() => {
    return {
      type: "textAlign",
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: editor.isActive({ textAlign: "center" }) ? "is-active" : "",
      children: <AiOutlineAlignCenter></AiOutlineAlignCenter>,
      icon: <AiOutlineAlignCenter></AiOutlineAlignCenter>,
      label: "中央寄せ",
    };
  }, []);

  const textAlignRight = useMemo(() => {
    return {
      type: "textAlign",
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: editor.isActive({ textAlign: "right" }) ? "is-active" : "",
      children: <AiOutlineAlignRight></AiOutlineAlignRight>,
      icon: <AiOutlineAlignRight></AiOutlineAlignRight>,
      label: "右寄せ",
    };
  }, []);

  const upload = useMemo(() => {
    return {
      type: "upload",
      onClick: () => null,
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: "",
      children: (
        <label>
          <AiOutlineUpload></AiOutlineUpload>
          <input type="file" onChange={handleUpload} hidden />
        </label>
      ),
      icon: (
        <label>
          <AiOutlineUpload></AiOutlineUpload>
          <input type="file" onChange={handleUpload} hidden />
        </label>
      ),
      label: "画像",
    };
  }, []);

  const link = useMemo(() => {
    return {
      type: "link",
      onClick: () => setLink(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: editor.isActive("link") ? "is-active" : "",
      children: <RxLink1></RxLink1>,
      icon: <RxLink1></RxLink1>,
      label: "埋め込み",
    };
  }, []);

  const linkBreak = useMemo(() => {
    return {
      type: "link",
      onClick: () => editor.chain().focus().unsetLink().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: !editor.isActive("link"),
      className: "",
      children: <RxLinkBreak1></RxLinkBreak1>,
      icon: <RxLinkBreak1></RxLinkBreak1>,
      label: "埋め込み",
    };
  }, []);

  const code = useMemo(() => {
    return {
      type: "code",
      onClick: () => editor.chain().focus().toggleCode().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: !editor.can().chain().focus().toggleCode().run(),
      className: editor.isActive("code") ? "is-active" : "",
      children: <RxCode></RxCode>,
      icon: <RxCode></RxCode>,
      label: "",
    };
  }, []);
  const clearMarks = useMemo(() => {
    return {
      type: "clear",
      onClick: () => editor.chain().focus().unsetAllMarks().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: "",
      children: "clear marks",
      icon: null,
      label: "",
    };
  }, []);
  const clearNodes = useMemo(() => {
    return {
      type: "clear",
      onClick: () => editor.chain().focus().clearNodes().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: "",
      children: "clear nodes",
      icon: null,
      label: "",
    };
  }, []);
  const paragraph = useMemo(() => {
    return {
      type: "paragraph",
      onClick: () => editor.chain().focus().setParagraph().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: editor.isActive("paragraph") ? "is-active" : "",
      children: "p",
      icon: null,
      label: "指定なし",
    };
  }, []);
  const codeBlock = useMemo(() => {
    return {
      type: "codeBlock",
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: editor.isActive("codeBlock") ? "is-active" : "",
      children: "code block",
      icon: null,
      label: "",
    };
  }, []);
  const hardBreak = useMemo(() => {
    return {
      type: "hardBreak",
      onClick: () => editor.chain().focus().setHardBreak().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: "",
      children: "br",
      icon: null,
      label: "",
    };
  }, []);
  const undo = useMemo(() => {
    return {
      type: "undo",
      onClick: () => editor.chain().focus().undo().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: !editor.can().chain().focus().undo().run(),
      className: "",
      children: <AiOutlineUndo></AiOutlineUndo>,
      icon: null,
      label: "",
    };
  }, []);
  const redo = useMemo(() => {
    return {
      type: "redo",
      onClick: () => editor.chain().focus().redo().run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: !editor.can().chain().focus().redo().run(),
      className: "",
      children: <AiOutlineRedo></AiOutlineRedo>,
      icon: null,
      label: "",
    };
  }, []);
  const textAlignJustify = useMemo(() => {
    return {
      type: "textAlign",
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      onMouseOver: () => null,
      onMouseLeave: () => null,
      disabled: false,
      className: editor.isActive({ textAlign: "justify" }) ? "is-active" : "",
      children: <RxTextAlignJustify></RxTextAlignJustify>,
      icon: null,
      label: "",
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
