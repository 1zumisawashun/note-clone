import styles from "./MenuButton.module.scss";
import { RxPlusCircled } from "react-icons/rx";
import { useEffect, useState, useCallback } from "react";

export type MenuButtonProps = {
  onClick?: () => void;
};

export const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => {
  const [height, setHeight] = useState(0);
  const onMouseUp = useCallback((event: any, element: any) => {
    const clickY = event.pageY;

    const elem = document.activeElement;
    console.log(elem, "===========");

    // 要素の位置を取得
    const clientRect = element.getBoundingClientRect();
    console.log(clientRect, "clientRect");
    const positionY = clientRect.top + window.pageYOffset;
    console.log(positionY, "");
    // 要素内におけるクリック位置を計算
    const y = clickY - positionY;
    // console.log(y, "=====");
    setHeight(y);
  }, []);

  const init = useCallback((): void => {
    const element = document.getElementById("test");
    element!.addEventListener("click", (e) => onMouseUp(e, element));
  }, [onMouseUp]);

  const reset = useCallback((): void => {
    const element = document.getElementById("test");
    element!.removeEventListener("click", (e) => onMouseUp(e, element));
  }, [onMouseUp]);

  useEffect(() => {
    init();
    return () => reset();
  }, [init, reset]);

  return (
    <div className={styles.menuButton} style={{ top: height }}>
      <RxPlusCircled
        onClick={onClick}
        style={{ fontSize: "25px" }}
      ></RxPlusCircled>
    </div>
  );
};
