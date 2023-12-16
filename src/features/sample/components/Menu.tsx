import { Editor } from "@tiptap/react";
import { BaseSyntheticEvent } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { addImage } from "../../../functions/helpers/addImage";
import { getDataUrl } from "../../../functions/helpers/getDataUrl";

export function Menu({ editor }: { editor: Editor }) {
  const handleUpload = async (e: BaseSyntheticEvent) => {
    const files = e.target.files;
    const src = await getDataUrl({ files });

    if (!src) {
      alert("error");
      return;
    }

    addImage({ src, editor });
  };

  return (
    <label>
      <AiOutlineUpload />
      <input type="file" onChange={handleUpload} hidden />
    </label>
  );
}
