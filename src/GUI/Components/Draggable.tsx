import React, {
  CSSProperties,
  useEffect,
  useRef,
  MouseEvent as ReactMouseEvent,
} from "react";

type DraggableProps = {
  position: { x: number; y: number };
  onStart: (e: ReactMouseEvent) => void;
  onDrag: (e: MouseEvent) => void;
  onStop: (e: ReactMouseEvent) => void;
  children: React.ReactElement;
};

const Draggable: React.FC<DraggableProps> = ({
  position,
  onStart,
  onDrag,
  onStop,
  children,
}) => {
  const cloneChildrenElement = React.cloneElement(children);
  const DraggableCss: CSSProperties = {
    position: "absolute",
    top: position.y,
    left: position.x,
  };
  const isSelect = useRef(false);

  const onMouseMove = (e: MouseEvent) => {
    if (isSelect) {
      onDrag(e);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const onStartDrag = (e: ReactMouseEvent) => {
    onStart(e);
    isSelect.current = true;
  };

  const onStopDrag = (e: ReactMouseEvent) => {
    onStop(e);
    isSelect.current = false;
  };

  return (
    <>
      {children}
      <div
        style={DraggableCss}
        onMouseDown={onStartDrag}
        onMouseUp={onStopDrag}
      >
        {cloneChildrenElement}
      </div>
    </>
  );
};

export default Draggable;
