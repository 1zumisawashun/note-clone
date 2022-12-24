import "./App.css";
import { EditorContent } from "./components/EditorContent";
import { MenuBar } from "./components/Menubar";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { content } from "./functions/constants/content";

function App() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
  });
  return (
    <div className="App">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default App;
