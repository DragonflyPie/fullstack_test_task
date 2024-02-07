import { useState } from "react";
import Canvas from "./Canvas";
import { Product } from "./productsAPI";
import parse from "html-react-parser";
import Button from "../../components/Button";
import useWindowWidth from "../../utils/useWindowWidth";

const SingleProduct = ({ image_url, description }: Product) => {
  const [clamped, setClamped] = useState(true);

  const windowWidth = useWindowWidth();
  const size = windowWidth < 300 ? windowWidth - 30 : 250;

  const toggleClamped = () => {
    setClamped(!clamped);
  };

  return (
    <div className="p-4 rounded-lg shadow flex flex-col items-center gap-2 bg-white transition-all">
      <Canvas url={image_url} size={size} />
      <div className={clamped ? "line-clamp-6 text-sm sm:text-lg" : ""}>
        {parse(description)}
      </div>
      <Button
        handleClick={toggleClamped}
        value={clamped ? "Show more" : "Show less"}
      />
    </div>
  );
};

export default SingleProduct;
