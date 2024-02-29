import { Router } from "express";
import { getProducts } from "../controller/productController";

const productsRoutes = Router();

productsRoutes.route("/").get(getProducts);

export default productsRoutes;
