import { NodeViewContent, NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import styled from "@emotion/styled";

const CustomNodeViewWrapper = styled(NodeViewWrapper)`
  background: #faf594;
  border: 3px solid #0d0d0d;
  border-radius: 0.5rem;
  margin: 1rem 0;
  white-space: pre-line;
  position: relative;
`;

const CustomNodeViewContent = styled(NodeViewContent)`
  margin: 2.5rem 1rem 1rem;
  padding: 0.5rem;
  border: 2px dashed #0d0d0d20;
  border-radius: 0.5rem;
`;

const Label = styled("span")`
  margin-left: 1rem;
  background-color: #0d0d0d;
  font-size: 0.6rem;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  position: absolute;
  top: 0;
  padding: 0.25rem 0.75rem;
  border-radius: 0 0 0.5rem 0.5rem;
`;

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
    <CustomNodeViewWrapper>
      <Label contentEditable={false} onClick={handleRemove}>
        React Component
      </Label>
      <CustomNodeViewContent />
    </CustomNodeViewWrapper>
  );
};
