import styles from "./App.module.scss";
import { EditorContent } from "./components/EditorContent";
import { Menubar } from "./components/Menubar";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { content } from "./functions/constants/content";
import { BubbleMenu } from "./components/BubbleMenu";
import { Image, TextAlign } from "./functions/utilities";

function App() {
  const editor = useEditor({
    extensions: [StarterKit, TextAlign, Image],
    content: content,
  });

  // NOTE:https://tiptap.dev/guide/output
  const handleSubmit = () => {
    if (!editor) return;
    const html = editor.getHTML();
    console.log(html, "html");
  };

  return (
    <div className={styles.container}>
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
