import { useState } from "react"
import Canvas from "./Canvas"
import { Product } from "./productsAPI"
import parse from "html-react-parser"
import Button from "../../components/Button"

const ProductListing = ({ image_url, description }: Product) => {
  const [clamped, setClamped] = useState(true)

  const toggleClamped = () => {
    setClamped(!clamped)
  }

  return (
    <div className="p-4 rounded-lg shadow flex flex-col items-center bg-white transition-all">
      <Canvas url={image_url} height={200} width={200} />
      <div className={clamped ? "line-clamp-6" : ""}>{parse(description)}</div>
      <Button
        handleClick={toggleClamped}
        value={clamped ? "Show more" : "Show less"}
      />
    </div>
  )
}

export default ProductListing
