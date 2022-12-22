import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TipTap from "./components/Tiptap";

function App() {
  const [count, setCount] = useState(0);
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
  });

  return (
    <div className="App">
      <TipTap />
      {/* <EditorContent editor={editor} /> */}
    </div>
  );
}

export default App;
