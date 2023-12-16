import { useRef } from "react";
import { Editor } from "@tiptap/react";
import { addImage } from "../../../functions/helpers/addImage";
import { getDataUrl } from "../../../functions/helpers/getDataUrl";
import { useDD } from "../../../functions/hooks/useDD";

export function DDWrapper({
  children,
  editor,
}: {
  children: React.ReactNode;
  editor: Editor;
}) {
  const dragRef = useRef<HTMLDivElement | null>(null);

  useDD(dragRef, async (e) => {
    const files = e.dataTransfer?.files;
    const src = await getDataUrl({ files });

    if (!src) {
      alert("error");
      return;
    }

    addImage({ src, editor });
  });
  return <div ref={dragRef}>{children}</div>;
}
