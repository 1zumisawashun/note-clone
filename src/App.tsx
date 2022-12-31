import { EditorContent } from "./components/EditorContent";
import { Menubar } from "./components/Menubar";
import { MenubarSub } from "./components/MenubarSub";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { content } from "./functions/constants/content_01";
import { BubbleMenu } from "./components/BubbleMenu";
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
} from "./functions/utilities";

function App() {
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
    <div style={{ position: "relative" }}>
      {editor && (
        <>
          <div style={{ maxWidth: "1280px", padding: "4rem" }} id="test">
            <Menubar editor={editor} />
            <MenubarSub editor={editor} />
            <BubbleMenu editor={editor} />
            <p>count is {editor.storage.characterCount.characters()}</p>
            <EditorContent editor={editor} />
            <button onClick={handleSubmit}>submit</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
