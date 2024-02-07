import { useEffect, useState } from "react"

function getWindowWidth() {
  const { innerWidth } = window
  return innerWidth
}

const useWindowWidth = () => {
  const [width, setWidth] = useState(getWindowWidth())

  useEffect(() => {
    function handleWindowResize() {
      setWidth(getWindowWidth())
    }

    window.addEventListener("resize", handleWindowResize)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  return width
}

export default useWindowWidth
