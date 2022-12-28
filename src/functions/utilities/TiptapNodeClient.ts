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
});
