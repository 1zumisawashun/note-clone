import { NodeViewContent, NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import styles from "./Component.module.scss";

// NOTE:https://github.com/ueberdosis/tiptap/discussions/1317
export const Component = (props: NodeViewProps) => {
  const { editor, getPos, node } = props;

  const from = getPos();
  const to = from + node.nodeSize;

  const handleRemove = () => {
    editor.commands.deleteRange({ from, to });
  };
  // FIXME:親のsplitが不明なのでちょっと対策がわからない
  // pタグ内のスプリットになるのでreact-componentが別れない

  return (
    <NodeViewWrapper className={styles.reactComponentWithContent}>
      <span className="label" contentEditable={false} onClick={handleRemove}>
        React Component
      </span>

      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};
