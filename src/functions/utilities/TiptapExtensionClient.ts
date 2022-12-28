import TiptapImage from "@tiptap/extension-image";
import TiptapTextAlign from "@tiptap/extension-text-align";
import { mergeAttributes } from "@tiptap/react";
import TiptapLink from "@tiptap/extension-link";
import TiptapHardBreak from "@tiptap/extension-hard-break";
import TiptapFocus from "@tiptap/extension-focus";
import TiptapParagraph from "@tiptap/extension-paragraph";

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

export const Focus = TiptapFocus.configure({
  className: "focus",
  mode: "shallowest",
});

/**
 * 以下を参考に実装した
 * https://github.com/ueberdosis/tiptap/blob/main/packages/extension-code-block/src/code-block.ts#L146
 */

/**
 * how do get the current node on click? > selection.$head.parent
 * https://github.com/ueberdosis/tiptap/discussions/2826
 */

/**
 * extendsがTiptapImageでもaddKeyboardShortcuts > Enterは問題なく動いていたので
 * より適した呼び出し方法があるはず、今はTiptapParagraphとして呼び出している
 */
export const Paragraph = TiptapParagraph.extend({
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const selection = editor.state.selection;
        const { $from } = selection;
        const typeName = $from.nodeBefore?.type.name;

        if (typeName !== "hardBreak") {
          editor.commands.insertContent("<br>");
          // NOTE:falseにしてしまうとなんか期待値にならない
          return true;
        }

        // NOTE:<br>はpos1なので<br>を消すためにpositionをマイナス1にする
        return editor
          .chain()
          .command(({ tr }) => {
            tr.delete($from.pos - 1, $from.pos);
            return true;
          })
          .createParagraphNear()
          .run();
      },
    };
  },
});
