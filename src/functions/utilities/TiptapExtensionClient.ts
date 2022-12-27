import { Image as TiptapImage } from "@tiptap/extension-image";
import TiptapTextAlign from "@tiptap/extension-text-align";
import { mergeAttributes } from "@tiptap/react";
import TiptapLink from "@tiptap/extension-link";
import TiptapHardBreak from "@tiptap/extension-hard-break";
import TiptapFocus from "@tiptap/extension-focus";

// NOTE:https://tiptap.dev/api/nodes/image
// NOTE:https://codesandbox.io/s/tiptap-image-forked-bvchsz?file=/src/Editor.jsx:409-416
export const Image = TiptapImage.extend({
  defaultOptions: {
    ...TiptapImage.options,
    sizes: ["inline", "block", "left", "right"],
    allowBase64: true,
  },
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

export const Focus = TiptapFocus.configure({
  className: "focus",
  mode: "shallowest",
});

export const HardBreak = TiptapHardBreak.extend({
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const selection = editor.view.state.selection;
        const isBeginning = !Boolean(selection.$from.textOffset);
        const isHardBreak = Boolean(selection.$head.nodeBefore);
        const isOrderedList = this.editor.isActive("orderedList");
        const isBulletList = this.editor.isActive("bulletList");

        if (isOrderedList || isBulletList) {
          return this.editor.chain().createParagraphNear().run();
        }

        if (isBeginning && isHardBreak) {
          this.editor.chain().focus().undo().run();
          return this.editor.chain().createParagraphNear().run();
        }

        if (isBeginning && !isHardBreak) {
          return this.editor.chain().createParagraphNear().run();
        }

        return this.editor.commands.setHardBreak();
      },
    };
  },
});
