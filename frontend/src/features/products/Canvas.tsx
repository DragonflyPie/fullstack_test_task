import { useEffect, useRef } from "react";
interface CanvasProps {
  url: string;
  size: number;
}

const Canvas = ({ url, size }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const image = new Image();
    image.src = url;

    image.onload = () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      const widthRatio = size / image.width;
      const heightRatio = size / image.height;
      const ratio = Math.min(widthRatio, heightRatio);

      const yShift = (size - image.height * ratio) / 2;
      const xShift = (size - image.width * ratio) / 2;

      ctx.drawImage(
        image,
        xShift,
        yShift,
        image.width * ratio,
        image.height * ratio,
      );
    };
  }, [canvasRef, url, size, size]);

  return <canvas ref={canvasRef} width={size} height={size} />;
};

export default Canvas;
