import {
  Extension,
  Editor,
  isNodeSelection,
  isTextSelection,
  posToDOMRect,
} from "@tiptap/core";
import { Plugin, PluginKey, EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

/**
 * https://stackoverflow.com/questions/73842787/how-to-add-custom-command-in-in-declaration-in-tiptap-when-extending-existing-ex
 */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    newline: {
      addNewline: () => ReturnType;
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

/**
 * extendsがTiptapImageでもaddKeyboardShortcuts > Enterは問題なく動いていたので
 * より適した呼び出し方法があるはず、今はTiptapParagraphとして呼び出している
 */

const handleExitOnDoubleEnter = (editor: Editor) => {
  const selection = editor.state.selection;
  const { $from } = selection;
  const typeName = $from.nodeBefore?.type.name;

  // FIXME:codeの時にbrを入れないハンドリングを追加する
  // FIXME:先頭でenterを押した場合は改行（p）させる
  if (typeName !== "hardBreak") {
    editor.commands.insertContent("<br>");
    // NOTE:falseにしてしまうとなんか期待値にならない
    // NOTE:trueで処理をスルーするっぽい > https://github.com/ueberdosis/tiptap/discussions/2948
    return true;
  }

  // NOTE:<br>はpos1なので<br>を消すためにpositionをマイナス1にする
  return (
    editor
      .chain()
      .command(({ tr }) => {
        tr.delete($from.pos - 1, $from.pos);
        return true;
      })
      // NOTE:https://tiptap.dev/api/commands/create-paragraph-near
      .createParagraphNear()
      .run()
  );
};

// NOTE:https://stackoverflow.com/questions/65668815/tiptap-how-to-create-a-paragraph-p-on-shift-enter-instead-of-a-br
// NOTE:コマンドの拡張で上記記事の内容を引用。別途型定義を拡張させる必要がある。
export const CustomNewline = Extension.create({
  name: "newline",
  priority: 1000, // Optional
  addCommands() {
    return {
      addNewline:
        () =>
        ({ editor, state, dispatch }) => {
          const { schema, tr } = state;
          const paragraph = schema.nodes.paragraph;

          const transaction = tr
            .deleteSelection()
            .replaceSelectionWith(paragraph.create(), true)
            .scrollIntoView();
          if (dispatch) dispatch(transaction);
          return true;
        },
    };
  },
  addKeyboardShortcuts() {
    return {
      // "Shift-Enter": () => this.editor.commands.addNewline(),
      // Enter: () => this.editor.commands.exitOnDoubleEnter(),
      Enter: ({ editor }) => handleExitOnDoubleEnter(editor),
      // NOTE:https://stackoverflow.com/questions/65668815/tiptap-how-to-create-a-paragraph-p-on-shift-enter-instead-of-a-br
      "Shift-Enter": ({ editor }) => {
        editor.commands.enter();
        return true;
      },
    };
  },
});

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

    this.tooltip.style.display = "";

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
        this.tooltip.style.bottom = box.bottom - start.top - result + "px";
      }
      if (parent.attrs.level === 2) {
        const result = (60 - 40) / 2 + 40;
        this.tooltip.style.bottom = box.bottom - start.top + 13 - result + "px";
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

// state.selection.emptyはスクロール選択のこと
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
          // focus（click）, inputText, enterで関数をセットする必要がある
          // ここのviewはこれが使える。https://prosemirror.net/docs/ref/#view
          handleTextInput(view, from, to, next) {
            let start = view.coordsAtPos(from);
            // console.log(start, "handleTextInput");
          },
          handleClick(view) {
            const from = view.state.selection.from;
            let start = view.coordsAtPos(from);
            // console.log(start, "handleClick");
          },
        },
      }),
    ];
  },
});
