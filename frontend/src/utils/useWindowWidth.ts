import { useEffect, useState } from "react"

const useWindowWidth = () => {
  const [width, setWidth] = useState(getWindowWidth())

  function getWindowWidth() {
    const { innerWidth } = window
    return innerWidth
  }

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
