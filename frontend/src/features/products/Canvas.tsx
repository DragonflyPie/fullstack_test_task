import React, { useEffect, useLayoutEffect, useRef } from "react"
interface CanvasProps {
  url: string
  height: number
  width: number
}

const Canvas = ({ url, height, width }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const image = new Image()
    image.src = url

    image.onload = () => {
      if (!canvasRef.current) return
      const ctx = canvasRef.current.getContext("2d")
      if (!ctx) return

      const widthRatio = width / image.width
      const heightRatio = height / image.height
      const ratio = Math.min(widthRatio, heightRatio)
      const yShift = (height - image.height * ratio) / 2

      ctx.drawImage(image, 0, yShift, image.width * ratio, image.height * ratio)
    }
  }, [canvasRef, url, width, height])

  return <canvas ref={canvasRef} width={width} height={height} className="" />
}

export default Canvas
