import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { DDWrapper } from "../sample/components/DDWrapper";
import { Menu } from "../sample/components/Menu";
import { content } from "../../functions/constants/content_01";
import { Image } from "../../functions/utilities";
import styled from "@emotion/styled";
import "../../assets/scss/editor.scss";

const EditorWrapper = styled("div")`
  max-width: 960px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export function Sample() {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: content,
  });

  const handleSubmit = () => {
    if (!editor) return;
    const html = editor.getHTML();
    alert(html);
  };

  if (!editor) return <p>loading...</p>;

  return (
    <EditorWrapper>
      <Menu editor={editor} />
      <DDWrapper editor={editor}>
        <EditorContent editor={editor} />
      </DDWrapper>
      <button onClick={handleSubmit}>submit</button>
    </EditorWrapper>
  );
}
