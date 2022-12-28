import { EditorContent } from "./components/EditorContent";
import { Menubar } from "./components/Menubar";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { content } from "./functions/constants/content";
import { BubbleMenu } from "./components/BubbleMenu";
import {
  Image,
  TextAlign,
  Link,
  Focus,
  ExtensionComponent,
  Paragraph,
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
    ],
    content: content,
  });

  // NOTE:https://tiptap.dev/guide/output
  const handleSubmit = () => {
    if (!editor) return;
    const html = editor.getHTML();
    alert(html);
  };

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "4rem" }}>
      {editor && (
        <>
          <Menubar editor={editor} />
          <BubbleMenu editor={editor} />
          <EditorContent editor={editor} />
        </>
      )}
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}

export default App;
