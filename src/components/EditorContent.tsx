import { EditorContent as TiptapEditorContent, Editor } from "@tiptap/react";
import { useDD } from "../functions/hooks";
import { MenuButton } from "./MenuButton";
import { useRef } from "react";
import { addImage } from "../functions/helpers/addImage";
import { getDataUrl } from "../functions/helpers/getDataUrl";
import "../assets/scss/editor.scss";

export type EditorContentProps = {
  editor: Editor;
};

export const EditorContent: React.FC<EditorContentProps> = ({ editor }) => {
  const dragRef = useRef<HTMLDivElement | null>(null);

  useDD(dragRef, async (e) => {
    const files = e.dataTransfer?.files;
    const src = (await getDataUrl({ files })) as string;
    if (!src) {
      alert("error");
    }
    addImage({ src, editor });
  });

  return (
    <div ref={dragRef}>
      <TiptapEditorContent
        editor={editor}
        style={{ position: "relative" }}
        // onKeyDown={() => console.log("key down")}
      >
        <MenuButton editor={editor} />
      </TiptapEditorContent>
    </div>
  );
};
