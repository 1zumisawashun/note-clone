import styles from "./App.module.scss";
import { EditorContent } from "./components/EditorContent";
import { Menubar } from "./components/Menubar";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { content } from "./functions/constants/content";
import { BubbleMenu } from "./components/BubbleMenu";
// NOTE:https://tiptap.dev/api/extensions/text-align
import TextAlign from "@tiptap/extension-text-align";
// NOTE:https://tiptap.dev/api/nodes/image
import Image from "@tiptap/extension-image";

function App() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
      Image.configure({
        allowBase64: true,
      }),
    ],
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
      <Menubar editor={editor} />
      <BubbleMenu editor={editor} />
      <EditorContent editor={editor} />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}

export default App;
