import { mergeAttributes } from "@tiptap/react";

import TiptapImage from "@tiptap/extension-image";
import TiptapTextAlign from "@tiptap/extension-text-align";
import TiptapLink from "@tiptap/extension-link";
import TiptapFocus from "@tiptap/extension-focus";
import TiptapParagraph from "@tiptap/extension-paragraph";
import TiptapPlaceholder from "@tiptap/extension-placeholder";
import TiptapCharacterCount from "@tiptap/extension-character-count";
import TiptapBlockquote from "@tiptap/extension-blockquote";

// test
export const Blockquote = TiptapBlockquote.extend({
  content: "paragraph*",
});
// NOTE:https://tiptap.dev/api/nodes/image
// NOTE:https://codesandbox.io/s/tiptap-image-forked-bvchsz?file=/src/Editor.jsx:409-416
export const Image = TiptapImage.extend({
  defaultOptions: {
    ...TiptapImage.options,
    sizes: ["inline", "block", "left", "right"],
    allowBase64: true,
  },
  // NOTE:components/Component.tsx見るといいかも
  renderHTML({ HTMLAttributes }) {
    const { style } = HTMLAttributes;
    return [
      "figure",
      { style },
      ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)],
    ];
  },
});

// NOTE:https://tiptap.dev/api/extensions/text-align
// NOTE:https://tiptap.dev/guide/custom-extensions#extend-existing-extensions
export const TextAlign = TiptapTextAlign.extend({
  addOptions() {
    return {
      types: ["heading", "paragraph", "image"],
      alignments: ["left", "center", "right", "justify"],
      defaultAlignment: "left",
    };
  },
});

// NOTE:https://tiptap.dev/api/marks/link
export const Link = TiptapLink.configure({
  HTMLAttributes: { target: "_blank" },
  linkOnPaste: false,
  openOnClick: true,
});

// renderHTMLでmenuButtonだせない？
export const Focus = TiptapFocus.configure({
  className: "focus",
  mode: "shallowest",
});

// NOTE:https://tiptap.dev/api/extensions/placeholder
export const Placeholder = TiptapPlaceholder.configure({
  emptyEditorClass: "is-editor-empty",
  emptyNodeClass: "my-custom-is-empty-class",
  placeholder: ({ node }) => {
    if (node.type.name === "heading") {
      return "What’s the title?";
    }

    return "Can you add some further context?";
  },
});

// NOTE:https://tiptap.dev/api/extensions/character-count
export const CharacterCount = TiptapCharacterCount;

export const Paragraph = TiptapParagraph;
