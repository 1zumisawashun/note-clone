import { MenuSub } from "./components/MenuSub";
import { EditorContent } from "./components/EditorContent";
import { Menu } from "./components/Menu";
import { MenuBubble } from "./components/MenuBubble";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { content } from "../../functions/constants/content_01";
import {
  Image,
  TextAlign,
  Link,
  Focus,
  ExtensionComponent,
  Paragraph,
  Placeholder,
  CharacterCount,
  CustomNewline,
  EventHandler,
  Blockquote,
} from "../../functions/utilities";
import styled from "@emotion/styled";

const Container = styled("div")`
  position: "relative";
`;
const EditorWrapper = styled("div")`
  max-width: 960px;
  margin: auto;
  padding: 4rem;
`;

export function Index() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign,
      Image,
      Link,
      Focus,
      ExtensionComponent,
      Paragraph,
      Placeholder,
      CharacterCount,
      CustomNewline,
      EventHandler,
      Blockquote,
    ],
    content: content,
    // onTransaction: ({ state }) => {
    //   console.log(state.selection.anchor)
    // },
  });

  // NOTE:https://tiptap.dev/guide/output
  const handleSubmit = () => {
    if (!editor) return;
    const html = editor.getHTML();
    alert(html);
  };

  return (
    <Container>
      {editor && (
        <>
          <EditorWrapper>
            <Menu editor={editor} />
            <MenuSub editor={editor} />
            <MenuBubble editor={editor} />
            <p>count is {editor.storage.characterCount.characters()}</p>
            <EditorContent editor={editor} />
            <button onClick={handleSubmit}>submit</button>
          </EditorWrapper>
        </>
      )}
    </Container>
  );
}
