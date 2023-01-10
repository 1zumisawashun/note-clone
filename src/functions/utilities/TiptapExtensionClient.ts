import {
  Extension,
  Editor,
  isNodeSelection,
  isTextSelection,
  posToDOMRect,
  getMarkRange,
} from "@tiptap/core";
import {
  Plugin,
  PluginKey,
  EditorState,
  TextSelection,
  NodeSelection,
} from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import Paragraph from "@tiptap/extension-paragraph";
import HardBreak from "@tiptap/extension-hard-break";

/**
 * https://stackoverflow.com/questions/73842787/how-to-add-custom-command-in-in-declaration-in-tiptap-when-extending-existing-ex
 * childrenでerrorが出る場合は明示的にd.tsに追加する必要がある
 * https://github.com/bsidelinger912/react-tooltip-lite/issues/130
 */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    newline: {
      addNewline: () => ReturnType;
      setNewParagraph: () => ReturnType;
      exitOnDoubleEnter: () => ReturnType;
    };
  }
}

/**
 * 以下を参考に実装した
 * https://github.com/ueberdosis/tiptap/blob/main/packages/extension-code-block/src/code-block.ts#L146
 */

/**
 * how do get the current node on click? > selection.$head.parent
 * https://github.com/ueberdosis/tiptap/discussions/2826
 */

// NOTE:https://stackoverflow.com/questions/65668815/tiptap-how-to-create-a-paragraph-p-on-shift-enter-instead-of-a-br
// NOTE:コマンドの拡張で上記記事の内容を引用。別途型定義を拡張させる必要がある。
// NOTE:trueで処理をスルーするっぽい > https://github.com/ueberdosis/tiptap/discussions/2948
export const CustomNewline = Extension.create({
  name: "newline",
  priority: 1000,
  // NOTE:https://tiptap.dev/api/commands#inline-commands
  addCommands() {
    return {
      addNewline:
        () =>
        ({ editor, state, dispatch, view }) => {
          const { schema, tr, selection } = state;

          const paragraph = schema.nodes.paragraph;
          const reactComponent = schema.nodes.reactComponent;

          const transaction = tr
            .deleteSelection()
            .replaceSelectionWith(paragraph.create(), false)
            .scrollIntoView();

          if (dispatch) dispatch(transaction);
          return true;
        },
      // NOTE:https://github.com/ueberdosis/tiptap/issues/2302
      // NOTE:https://stackoverflow.com/questions/74385856/how-do-i-remove-default-behavior-of-shift-enter-or-add-custom-behavior-in-tipt
      setNewParagraph:
        () =>
        ({ commands, state }) => {
          const { selection, schema } = state;
          const { $head } = selection;

          // NOTE:選択しているnodeの次のブロックに指定する
          const position = $head.after();
          return commands.insertContentAt(
            { from: position, to: position },
            { type: Paragraph.name } // Note this is adding a paragraph "<p></p>" > 直接宣言しても問題ない
          );
        },
      exitOnDoubleEnter:
        () =>
        ({ editor, state, chain, commands, tr }) => {
          const { $from } = state.selection;
          const typeName = $from.nodeBefore?.type.name;
          const isList =
            editor.isActive("bulletList") || editor.isActive("orderedList");
          const isBlockQuote = editor.isActive("blockquote");

          // NOTE:nodeを削除する
          if ($from.nodeBefore === null && (isList || isBlockQuote)) {
            commands.clearNodes();
            return true;
          }

          // NOTE:nodeの先頭でenterを押下したらparagraphで改行
          if ($from.nodeBefore === null) {
            return commands.createParagraphNear();
          }

          // NOTE:list系でなく、直前にbrタグがない場合enterを押下したらbrで改行する
          if (typeName !== "hardBreak" && !isList && !isBlockQuote) {
            return commands.insertContent({ type: HardBreak.name });
          }

          // NOTE:list系でなく、直前にbrタグがある場合enterを押下したら直前のbrを削除してparagraphで改行する
          if (typeName === "hardBreak" && !isList && !isBlockQuote) {
            return (
              chain()
                // NOTE:https://tiptap.dev/api/commands#inline-commands
                .command(({ tr, dispatch }) => {
                  const transaction = tr.delete($from.pos - 1, $from.pos);
                  if (dispatch) dispatch(transaction);
                  return true;
                })
                // NOTE:https://tiptap.dev/api/commands/create-paragraph-near
                .createParagraphNear()
                .run()
            );
          }

          // NOTE:どれにもヒットしなければparagraphで改行する
          return commands.createParagraphNear();
        },
    };
  },
  addKeyboardShortcuts() {
    return {
      // "Shift-Enter": () => this.editor.commands.addNewline(),
      Enter: () => this.editor.commands.exitOnDoubleEnter(),
      // NOTE:https://stackoverflow.com/questions/65668815/tiptap-how-to-create-a-paragraph-p-on-shift-enter-instead-of-a-br
      // "Shift-Enter": ({ editor }) => editor.commands.enter(),
      "Shift-Enter": ({ editor }) => editor.commands.setNewParagraph(),
    };
  },
});

// NOTE: https://prosemirror.net/examples/tooltip/ > proseMirrorを参考に実装
// NOTE: https://codemirror.net/examples/tooltip/ > codeMirrorはやはりちょっと違う
class SelectionSizeTooltip {
  tooltip;

  constructor(view: EditorView) {
    this.tooltip = document.getElementById("tooltip");
    if (!this.tooltip) return;

    if (view.dom.parentNode) {
      view.dom.parentNode.appendChild(this.tooltip);
    }

    this.update(view, null);
  }

  update(view: EditorView, lastState: EditorState | null) {
    const from = view.state.selection.from;
    let start = view.coordsAtPos(from);

    if (!lastState) return;
    if (!this.tooltip) return;

    this.tooltip.classList.add("tooltip");
    this.tooltip.style.display = "";

    // if (!view.hasFocus()) {
    //   this.tooltip.style.display = "none";
    //   return;
    // }

    if (!this.tooltip.offsetParent) {
      this.tooltip.style.display = "none";
      return;
    }

    let box = this.tooltip.offsetParent.getBoundingClientRect();

    this.tooltip.style.left = -50 + "px";

    const parent = view.state.selection.$head.parent;

    if (parent.type.name === "heading") {
      if (parent.attrs.level === 1) {
        const result = (70 - 40) / 2 + 40;
        this.tooltip.style.bottom = box.bottom - start.top + 14 - result + "px";
      }
      if (parent.attrs.level === 2) {
        const result = (60 - 40) / 2 + 40;
        this.tooltip.style.bottom = box.bottom - start.top + 14 - result + "px";
      }
      if (parent.attrs.level === 3) {
        const result = (50 - 40) / 2 + 40;
        this.tooltip.style.bottom = box.bottom - start.top + 12 - result + "px";
      }
    }
    if (parent.type.name === "paragraph") {
      const result = (40 - 40) / 2 + 40;
      this.tooltip.style.bottom = box.bottom - start.top + 8 - result + "px";
    }
  }

  destroy() {
    if (!this.tooltip) return;
    this.tooltip.remove();
  }
}

/**
 * state.selectionに関してはこれに詳細書いてある>https://benborgers.com/posts/tiptap-selection
 * state.selection.emptyはスクロール選択のこと
 * 参考にしたのは下記
 * https://stackoverflow.com/questions/73739904/how-can-i-upload-files-in-tip-tap-editor-for-react
 */
export const EventHandler = Extension.create({
  name: "eventHandler",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("eventHandler"),
        view(editorView) {
          return new SelectionSizeTooltip(editorView);
        },
        props: {
          // ここのviewはこれが使える。https://prosemirror.net/docs/ref/#view
          handleTextInput(view, from, to, next) {
            let start = view.coordsAtPos(from);
            // console.log(start, "handleTextInput");
          },
          handleClick(view, pos) {
            const from = view.state.selection.from;
            let start = view.coordsAtPos(from);
            // console.log(start, "handleClick");
            const { schema, doc, tr } = view.state;
            // console.log(doc.resolve(pos), "doc.resolve(pos)");
          },
          // NOTE:https://github.com/apostrophecms/apostrophe/blob/11e47fdd0ab03e615f4fb3a3269ced1f09cbb259/lib/modules/apostrophe-rich-text-widgets/src/apos/tiptap-extensions/Link.js#L79
          // NOTE:https://snyk.io/advisor/npm-package/tiptap-utils/example
          handleDoubleClick(view, pos, event) {
            const { schema, doc, tr } = view.state;
            const range = getMarkRange(doc.resolve(pos), schema.marks.link);

            if (!range) return;

            // NOTE:aタグのテキストをダブルクリックするとaタグで囲われているテキスト全体にハイライトがあたる
            const $start = doc.resolve(range.from);
            const $end = doc.resolve(range.to);
            const transaction = tr.setSelection(
              new TextSelection($start, $end)
            );

            view.dispatch(transaction);
          },
        },
      }),
    ];
  },
});
