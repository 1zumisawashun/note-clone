import { Image as TiptapImage } from "@tiptap/extension-image";
import TiptapTextAlign from "@tiptap/extension-text-align";
import { mergeAttributes } from "@tiptap/react";
import TiptapLink from "@tiptap/extension-link";
import TiptapHardBreak from "@tiptap/extension-hard-break";
import TiptapFocus from "@tiptap/extension-focus";
import { Extension } from "@tiptap/core";
import TiptapParagraph from "@tiptap/extension-paragraph";

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

export const Paragraph = TiptapImage.extend({
  addKeyboardShortcuts() {
    return {
      // exit node on triple enter
      Enter: ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { $from, empty } = selection;

        // FIXME:これをフォーカス当たっているHTMLだけ取得したい
        const result = editor.getHTML();
        console.log(result);

        // const endsWithDoubleNewline = $from.parent.textContent.match("\n\n");
        console.log($from.nodeBefore);
        const endsWithDoubleNewline = result.match("<br><br>");

        if (!endsWithDoubleNewline) {
          // editor.commands.insertContent("\n");
          editor.commands.insertContent("<br>");
          return true; // trueで一旦コマンドが切れる
        }

        return editor
          .chain()
          .command(({ tr }) => {
            console.log("ここまでは生きている？");
            tr.delete($from.pos - 2, $from.pos);
            return true;
          })
          .createParagraphNear()
          .run();
      },
    };
  },
});

// export const HardBreak = TiptapHardBreak.extend({
//   addKeyboardShortcuts() {
//     return {
//       Enter: ({ editor }) => {
//         const selection = editor.view.state.selection;
//         const isBeginning = !Boolean(selection.$from.textOffset);
//         const isHardBreak = Boolean(selection.$head.nodeBefore);
//         const isOrderedList = this.editor.isActive("orderedList");
//         const isBulletList = this.editor.isActive("bulletList");
//         const nodeType = selection.$head.nodeBefore?.type;
//         // console.log(nodes)
//         // editor.commands.splitBlock();
//         // return this.editor.chain().createParagraphNear().run();
//         if (isOrderedList || isBulletList) {
//           return this.editor.chain().createParagraphNear().run();
//           // return editor.commands.splitBlock();
//         }

//         if (isBeginning && isHardBreak) {
//           if (nodeType) {
//             editor.chain().focus().deleteNode(nodeType).run();
//             // editor.chain().focus().deleteNode("reactComponent").run();
//             // editor.commands.deleteNode("hardBreak");
//             console.log("ここ動いている！");
//           }
//           // return this.editor.chain().createParagraphNear().run();
//           return editor.commands.splitBlock();
//           // return this.editor.chain().createParagraphNear().run();
//         }

//         if (isBeginning && !isHardBreak) {
//           return this.editor.chain().createParagraphNear().run();
//           return editor.commands.splitBlock();
//         }

//         return this.editor.commands.setHardBreak();
//       },
//     };
//   },
// });
