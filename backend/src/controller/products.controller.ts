import { Response, Request } from "express";
import { getDbProducts } from "../services/products/productService";
import { Code } from "../enum/httpStatus.enum";

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
    return res.send(dbProducts);
  } catch (err: unknown) {
    console.log(err);

    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send("Error fetching products");
  }
};

// export const createProduct = async (product: Product): Promise<void> => {
//   console.info(
//     `[${new Date().toLocaleString()}] Trying to insert product ${
//       product.shopify_id
//     }`
//   );

//   const pool = await connection();
//   try {
//     const result: ResultSet = await pool.query(
//       QUERY.CREATE_PRODUCT,
//       Object.values(product)
//     );

//     let createdProduct = {
//       id: (result[0] as ResultSetHeader).insertId,
//       product,
//     };

//     console.info(`Success. Product created: ${createdProduct}`);
//   } catch (err: unknown) {
//     console.log(err);
//   } finally {
//     pool.end();
//   }
// };

// export const createProduct = async (
//   req: Request
//   res: Response
// ): Promise<Response<HttpResponse>> => {
//   console.info(
//     `[${new Date().toLocaleString()}] Incoming ${req.method} ${
//       req.originalUrl
//     } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
//   );

//   let product: Product = { ...req.body };

//   try {
//     const pool = await connection();
//     const result: ResultSet = await pool.query(
//       QUERY.CREATE_PRODUCT,
//       Object.values(product)
//     );

//     product = { id: (result[0] as ResultSetHeader).insertId, ...req.body };

//     return res
//       .status(Code.CREATED)
//       .send(
//         new HttpResponse(
//           Code.CREATED,
//           Status.CREATED,
//           "Product created",
//           product
//         )
//       );
//   } catch (err: unknown) {
//     console.log(err);

//     return res
//       .status(Code.INTERNAL_SERVER_ERROR)
//       .send(
//         new HttpResponse(
//           Code.INTERNAL_SERVER_ERROR,
//           Status.INTERNAL_SERVER_ERROR,
//           "Error happened"
//         )
//       );
//   }
// };
