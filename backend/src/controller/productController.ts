import { Response, Request } from "express";
import { getDbProducts } from "../services/products/productsService";
import { Code } from "../enum/httpStatus";
import { cleanHtml } from "../services/utils/sanitize";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.info(
    `[${new Date().toLocaleString()}] Incoming ${req.method} ${
      req.originalUrl
    } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
  );

  try {
    const dbProducts = await getDbProducts();
    const sanitizedProducts = dbProducts.map((product) => {
      return { ...product, description: cleanHtml(product.description) };
    });

    return res.send(sanitizedProducts);
  } catch (err: unknown) {
    console.log(err);

    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send("Error fetching products");
  }
};
