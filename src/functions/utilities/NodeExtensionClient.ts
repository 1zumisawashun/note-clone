import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { Component } from "../../components/Component";

export const ExtensionComponent = Node.create({
  name: "reactComponent",
  group: "block",
  draggable: true,

  // code: true,
  // isolating: true,
  // defining: true,
  content: "block*",
  parseHTML() {
    return [
      {
        tag: "react-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    // return ["react-component", mergeAttributes(HTMLAttributes)];
    return ["react-component", 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },

  // addKeyboardShortcuts() {
  //   return {
  //     // exit node on triple enter
  //     Enter: ({ editor }) => {
  //       const { state } = editor;
  //       const { selection } = state;
  //       const { $from, empty } = selection;
  //       // console.log(state, selection, $from, empty);
  //       // if (!empty || $from.parent.type !== this.type) {
  //       //   return false;
  //       // }
  //       // const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
  //       const endsWithDoubleNewline = $from.parent.textContent.match("\n\n");
  //       // const endsWithDoubleNewline =
  //       //   $from.parent.textContent.match("<br><br>");
  //       // console.log($from.parent.textContent.match("<br><br>"));

  //       // const doubleNewline = $from.parent.textContent.match("\n\n");
  //       // const endsWithDoubleNewline =
  //       //   $from.parent.textContent.endsWith("<br><br>");

  //       if (!endsWithDoubleNewline) {
  //         console.log($from.parent.textContent, "$from.parent.textContent");
  //         console.log(endsWithDoubleNewline);
  //         editor.commands.insertContent("\n");
  //         return true; // trueで一旦コマンドが切れる
  //       }
  //       console.log("ここまでは生きている？");
  //       return editor
  //         .chain()
  //         .command(({ tr }) => {
  //           tr.delete($from.pos - 2, $from.pos);
  //           return true;
  //         })
  //         .createParagraphNear()
  //         .run();
  //     },
  //   };
  // },
});
